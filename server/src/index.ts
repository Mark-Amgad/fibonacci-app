import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, my server is alive.");
});

app.get("/test", (req, res) => {
  res.send("Test endpoint");
});

app.get("/indexes", (req, res) => {
  console.log("indexes endpoint called !");
  res.send([5, 6, 7, 8]);
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
