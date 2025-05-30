// Get 3rd Party modules
const express = require("express");
// Get Custom built modules
const fm = require("./filemgr");
// Get database connection 
const connectDB = require("./connect");

// Define port
port = 8080

// Create the express http server
const appName = "Task Manager";
const app = express();
app.listen(port, () => {
  console.log(`App ${appName} is running on port ${port}`);
})

// Define some built-in middleware
app.use(express.static("./Client"));
app.use(express.json());

// Data model (schema)
const data = require("./tasks")


// Define HTTP routes listenting for requests
app.get("/api", async (req, res) => {
  try {
    const list = await fm.readList();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Failed to read list." });
  }
});

app.post("/api", async (req, res) => {
  try {
    const newItem = req.body.item;
    const list = await fm.readList();
    list.push(newItem);
    await fm.writeList(list);
    res.status(201).json({ message: "Item added", list });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item." });
  }
});

app.put("/api", async (req, res) => {
  try {
    const newList = req.body.list;
    await fm.writeList(newList);
    res.json({ message: "List replaced", list: newList });
  } catch (err) {
    res.status(500).json({ error: "Failed to replace list." });
  }
});

app.delete("/api", async (req, res) => {
  try {
    const index = parseInt(req.body.index);
    const list = await fm.readList();
    if (index >= 0 && index < list.length) {
      const removed = list.splice(index, 1);
      await fm.writeList(list);
      res.json({ message: "Item deleted", removed, list });
    } else {
      res.status(400).json({ error: "Invalid index" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item." });
  }
});


// page not found route
app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

