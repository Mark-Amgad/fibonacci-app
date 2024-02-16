import express from "express";
import cors from "cors";
import config from "./config/config";
import connection from "./database/connection";
import { createClient } from "redis";

const redisClient = createClient({ socket: { host: config.redisHost } });

const app = express();
const port = 4000;

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connection.query(
    `CREATE TABLE IF NOT EXISTS values (id SERIAL PRIMARY KEY,number INT)`
  );
  console.log("Database is running.");
  await redisClient.connect();
  console.log("Redis Server is running.");
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(config);
  res.send("Hello, my server is alive.");
});

app.get("/test", (req, res) => {
  res.send("Test endpoint");
});

// FOR REACT APP

app.get("/indexes", async (req, res) => {
  console.log("I asked to get all indexes");
  const query = `SELECT * FROM values`;
  const result = await connection.query(query);
  const indexes = [];
  for (let i = 0; i < result.rows.length; i++) {
    indexes.push(result.rows[i].number);
  }
  res.send(indexes);
});

app.post("/indexes", async (req, res) => {
  console.log("I asked to add a new index");
  const index = req.body.index;

  if (!index) {
    return res.status(422).send("Please provide an index in the body");
  }

  if (Number(index) > 40) {
    return res.status(422).send("This number is too high!");
  }

  const query = `INSERT INTO values(number) VALUES($1)`;
  await connection.query(query, [Number(index)]);
  redisClient.hSet("values", index, "nothing-yet");
  callWorkerServer(Number(index));
  return res.send({
    message: "Index has been added",
  });
});

app.get("/values", async (req, res) => {
  console.log("I asked to get all calculated values");
  type valueType = {
    index: number;
    value: number;
  };

  const redisHash = await redisClient.hGetAll("values");

  const values: valueType[] = [];
  const keys: string[] = Object.keys(redisHash);
  keys.forEach((key, val) => {
    values.push({
      index: Number(key),
      value: Number(redisHash[key]),
    });
  });

  res.send(values);
});

const callWorkerServer = async (n: number): Promise<boolean> => {
  const endpoint = `http://${config.workerServerHost}:${config.workerServerPort}/calc-fib`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        index: Number(n),
      }),
    });

    if (response.ok) {
      console.log("Success call to worker-server");
      return true;
    }
    return false;
  } catch (err) {
    console.log("Error in call worker server");
  }
  return false;
};
