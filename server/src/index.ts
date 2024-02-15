import express from "express";
import cors from "cors";
import config from "./config/config";
import connection from "./database/connection";
import { createClient } from "redis";

const redisClient = createClient({ socket: { host: config.redisHost } });

const redisPublisher = redisClient.duplicate();

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
  console.log("indexes endpoint called !");
  const query = `SELECT * FROM values`;
  const result = await connection.query(query);
  const indexes = [];
  for (let i = 0; i < result.rows.length; i++) {
    indexes.push(result.rows[i].number);
  }
  res.send(indexes);
});

app.post("/indexes", async (req, res) => {
  const index = req.body.index;

  if (!index) {
    return res.send("Please provide an index in the body").status(422);
  }

  if (Number(index) > 40) {
    return res.send("This number is too high!").status(422);
  }

  const query = `INSERT INTO values(number) VALUES($1)`;
  await connection.query(query, [Number(index)]);
  redisClient.hSet("values", index, "nothing-yet");
  //redisPublisher.publish("insert", index);
  res.send("Index has been added");
});

app.get("/values", async (req, res) => {
  console.log("values endpoint called !");
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

  console.log(values);

  res.send(values);
});
