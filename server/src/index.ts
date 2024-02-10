import express from "express";
import cors from "cors";
import config from "./config/config";
import connection from "./database/connection";

const app = express();
const port = 4000;

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connection.query(
    `CREATE TABLE IF NOT EXISTS values (id SERIAL PRIMARY KEY,number INT)`
  );
  console.log("Database is running.");
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
  res.send("Index has been added");
});

app.get("/values", (req, res) => {
  console.log("values endpoint called !");
  type valueType = {
    index: number;
    value: number;
  };

  const values: valueType[] = [
    { index: 5, value: 10 },
    { index: 6, value: 10 },
    { index: 7, value: 10 },
    { index: 8, value: 10 },
  ];

  res.send(values);
});
