// Import required modules
//todo debug
console.log("loading express ")
const express = require("express");
//todo debug
console.log("loading path ")
const path = require("path");
//todo debug
console.log("loading filemgr ")
const fm = require("./filemgr"); 

// Create the Express app
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "Client"))); 
app.use(express.json()); // Parse  JSON

// Route to GET the current list
// app.get("/api/list", async (req, res) => {
//   try {
//     const list = await fm.ReadData();
//     res.json(list);
//   } catch (err) {
//     res.status(500).json({ message: "Error reading list", error: err.message });
//   }
// });
async function GetList() {
    try {
      const response = await http.request("GET", "/list");
      console.log("Response from server:", response); // <--- This is the key line
      theList = response;
      ShowList();
    } catch (err) {
      result.innerHTML = `Error: ${err.message}`;
      console.error("Fetch error:", err);
    }
  }
  

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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
