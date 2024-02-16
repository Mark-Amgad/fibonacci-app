import express from "express";
import { createClient } from "redis";
import config from "./config/config";
import cors from "cors";

const app = express();
const port = 4001;
app.use(cors());
app.use(express.json());

const redisClient = createClient({ socket: { host: config.redisHost } });

app.listen(port, async () => {
  console.log(`Worker-server is running at http://localhost:${port}`);
  await redisClient.connect();
  console.log(`Worker-server is connected to redis`);
});

app.get("/", (req, res) => {
  console.log("I am alive");
  res.send("worker-server is alive");
});

const calculateFib = (n: number): number => {
  console.log("Running Fib Calculations ...");
  if (n < 2) {
    return 1;
  }
  return calculateFib(n - 1) + calculateFib(n - 2);
};

app.post("/calc-fib", (req, res) => {
  console.log("I asked to calculate a fib");
  let index = req.body.index;
  if (!index) {
    return res
      .send("Please add an index into the body of the request")
      .status(402);
  }
  index = parseInt(index);
  if (!index) {
    return res.send("Index should be a number").status(402);
  }

  if (index > 40) {
    return res.send("Index should less than 40r").status(402);
  }

  // TODO : check in redis if the value is already calculated

  const fib = calculateFib(index);

  redisClient.hSet("values", index, fib);
});
