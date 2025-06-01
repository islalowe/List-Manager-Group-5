// Import required modules
const express = require("express");
const path = require("path");
const fm = require("./filemgr"); 

// Create the Express app
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "Client"))); 
app.use(express.json()); // Parse  JSON

// Route to GET the current list
app.get("/api/list", async (req, res) => {
  try {
    const list = await fm.ReadData();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error reading list", error: err.message });
  }
});

// Route to POST an updated list
app.post("/api/list", async (req, res) => {
  try {
    const newList = req.body;
    await fm.WriteData(newList);
    res.status(200).json({ message: "List saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving list", error: err.message });
  }
});

// Catch-all route for undefined paths
app.all("*", (req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
