//todo: commented this out, it was the example but the assignment says to use the library made in the first project
//const http = new coreHTTP;

// The library made in the first project
const http = new APILibrary("http://localhost:3000/api"); // local server with port 3000

// This file will use CoreHTTP to:
// GET the current list from api
// POST new tasks when a user adds one
// PUT updates to tasks
// DELETE tasks 



// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", httpPost); // Sends a POST request to the server to add an item
delButton.addEventListener("click", httpDelete); // Sends a Delete request to the server

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

// Function to retrieve the list of tasks from the server 
async function GetList() {
  try {
    const response = await http.request("GET", "/list");
    theList = response; //update the block variable theList with the retrieved data
    ShowList();
  } catch (err) {
    result.innerHTML = `Error: ${err.message}`;
  }
}

// Function to send theList aray to the server with a Post request
async function WriteList() {
  try {
    await http.request("POST", "/list", "", JSON.stringify(theList))
    await GetList(); // Refresh the list display after writing
  } catch (err) {
result.innerHTML = `Error: ${err.message}`;
  }
}

/* Listener Functions */
// Function to update theList by adding a task
async function httpPost(e) {
  e.preventDefault();  // To orevent the form from submitting
  const newItem = input.value.trim();
  if (newItem === "") {
    result.innerHTML = "Please enter a valid item.";
    return;
  }
  theList.push(newItem); // Add new item locally
  input.value = ""; // Clear input box
  await WriteList(); // Send updated list to server and refresh display
}

// Function to update theList by deleting a task
//todo: I made it async
async function httpDelete(e) {
  e.preventDefault();  // To stop the form from submitting
  if (theList.length === 0) {
    result.innerHTML = "No items to delete.";
    return;
  }
  theList.pop(); // Remove last item
  await WriteList(); // Send updated list to server and refresh display
}


// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();