const express = require("express");
const app = express();
const morgan = require("morgan");
const port = "3000";
const authMiddleware = require("./auth");
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(morgan("combined"));

app.use(authMiddleware);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server");
});

app.get("/items", (req, res) => {
  fs.readFile("./src/data.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading file" });
    res.json(JSON.parse(data));
  });
});

app.post("/items", (req, res) => {
  const newItem = req.body;

  fs.readFile("./src/data.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading file" });

    const items = JSON.parse(data);
    
    // Only create new items, don't update existing ones
    newItem.id = Date.now().toString();
    items.push(newItem);

    fs.writeFile("./src/data.json", JSON.stringify(items, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error writing file" });
      res.status(201).json(newItem);
    });
  });
});

app.put("/items/:id", (req, res) => {
  const id = req.params.id;
  const updateItem = req.body;
  
  fs.readFile("./src/data.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading file" });
    
    let items = JSON.parse(data);
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }
    
    // Update the item while preserving the ID
    items[index] = { ...updateItem, id };

    fs.writeFile("./src/data.json", JSON.stringify(items, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error writing file" });
      res.status(200).json(items[index]);
    });
  });
});

app.put("/items/update/:id", (req, res) => {
  const id = req.params.id;
  const updateItem = req.body;
  
  fs.readFile("./src/data.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading file" });
    let items = JSON.parse(data);
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }
    items[index] = { ...items[index], ...updateItem, id };

    fs.writeFile("./src/data.json", JSON.stringify(items, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error writing file" });
      res.status(200).json(items[index]);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
