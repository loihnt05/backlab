const express = require("express");
const app = express();
const morgan = require('morgan')
const port = "3000";
const authMiddleware = require("./auth");
const cors = require("cors");
const fs = require('fs');

app.use(cors());
app.use(morgan('combined'))

app.use(authMiddleware);
app.use(express.json());


app.get("/", (req, res) => {
  res.send("server");
});

app.get('/items', (req, res) => {
  fs.readFile('./src/data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading file' });
    res.json(JSON.parse(data));
  });
});

app.post('/items', (req, res) => {
  const newItem = req.body;

  fs.readFile('./src/data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading file' });

    const items = JSON.parse(data);
    
    // Check if item already exists (update) or is new (create)
    const existingIndex = items.findIndex(item => item.id === newItem.id);
    
    if (existingIndex !== -1) {
      // Update existing item
      items[existingIndex] = newItem;
    } else {
      // Create new item with new ID
      newItem.id = Date.now().toString();
      items.push(newItem);
    }

    fs.writeFile('./src/data.json', JSON.stringify(items, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Error writing file' });
      res.status(existingIndex !== -1 ? 200 : 201).json(newItem);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
