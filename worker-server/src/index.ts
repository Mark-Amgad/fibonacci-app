import express from "express";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("worker-server is alive");
});

app.listen(port, () => {
  console.log(`Worker-server is running at http://localhost:${port}`);
});
