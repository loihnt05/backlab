const express = require("express");
const app = express();
const morgan = require('morgan')
const port = "3000";
const authMiddleware = require("./auth");
const cors = require("cors");

app.use(cors());
app.use(morgan('combined'))

app.use(authMiddleware);
app.use(express.json());
// app.use((req, res) => {
//     console.log(`${req.method} ${req.url}`)
//     next()
// })

app.get("/", (req, res) => {
  res.send("server");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
