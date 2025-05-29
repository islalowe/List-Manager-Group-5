// Importing modules
const fs = require("fs/promises")
const path = require("path");

//todo not sure if this chunk is necessary
// import { readFile, writeFile, appendFile, unlink, mkdir, rmdir, stat } from "fs/promises";
// import path from "path";
// import { getFilePath, getNewPath, getDirName } from "./utils.mjs";
//todo

// dataFile is a variable for whatever the literal file name happens to be
const dataFile = path.join(__dirname, "listdata.json");

// Function to read from a file
async function ReadData() {
  try {
    // Make sure the file exists
    await fs.access(dataFile);
    // Read the file
    console.log("Reading a file...\n");
    const fileBuffer = await fs.readFile(dataFile, "utf-8");
    // convert the buffer to a json object and return it
    const data = JSON.parse(fileBuffer);
    return data;
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    } else {
      console.error("Error reading data:", error.message);
      throw error;
    }
  }
}

// Function to write to a file
async function WriteData(dataOut) {
  try {
    // Convert JS object to JSON string and write to file
    await fs.writeFile(dataFile, JSON.stringify(dataOut, null, 2));
    console.log("Writing to a file...\n")
  } catch (error) {
    console.error("Error writing data:", error.message);
    throw error;
  }
}

exports.ReadData = ReadData;
exports.WriteData = WriteData;






