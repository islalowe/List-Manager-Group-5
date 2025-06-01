// Load 3rd-party modules
const express = require("express");
const path = require("path");

// Load custom file manager module
const fm = require("./filemgr");

// Create the express app
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "Client"))); // serve static files (HTML, CSS, JS)
app.use(express.json()); // parse JSON bodies

// GET the current list
app.get("/api/list", async (req, res) => {
  try {
    const data = await fm.ReadData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error reading list data", error: err.message });
  }
});

// POST a new list 
app.post("/api/list", async (req, res) => {
  try {
    const newList = req.body;
    await fm.WriteData(newList);
    res.status(200).json({ message: "List saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error writing list data", error: err.message });
  }
});

// Catch-all for undefined routes
app.all("*", (req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
