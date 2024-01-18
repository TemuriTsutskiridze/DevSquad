function getDate() {
  let dateToday = document.getElementById("date");

  let today = new Date();
  let day = `${today.getDate() < 10 ? "0" : ""}${today.getDate()}`;
  let month = `${today.getMonth() + 1 < 10 ? "0" : ""}${today.getMonth() + 1}`;
  let year = today.getFullYear();

  dateToday.value = `${year}-${month}-${day}`;
}

getDate();

const imageInput = document.getElementById("input-file");
const fileInfo = document.getElementById("file-info");
const fileNameDisplay = document.getElementById("file-name");
const removeFileButton = document.getElementById("remove-file");
const fileDragArea = document.querySelector(".file-drag-area");
const fileContainer = document.querySelector(".file-upload-container");

// Function to update the UI after a file is selected or dropped
function updateUIWithFile(file) {
  fileNameDisplay.textContent = file.name;
  fileInfo.style.display = "flex"; // Set display to flex for fileInfo
  fileContainer.style.display = "none"; // Hide the file drag area by setting display to none
}

// Event listener for uploading file
imageInput.addEventListener("change", function (event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    updateUIWithFile(file);
  }
});

// Event listener for the remove file button
removeFileButton.addEventListener("click", function () {
  fileInfo.style.display = "none"; // Hide the file info display
  fileContainer.style.display = "flex"; // Show the drag area
  imageInput.value = null; // Reset the file imageInput
});

// Drag and drop event listeners
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  fileDragArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

fileDragArea.addEventListener("drop", function (e) {
  const dt = e.dataTransfer;
  const file = dt.files[0];
  console.log(file);

  updateUIWithFile(file);
  imageInput.files = dt.files;
});

// ---------category choice
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:3000/data");
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const json = await response.json();
    createCategoryElements(json.data);
  } catch (error) {
    console.log("Error loading category data", error);
  }
});

function createCategoryElements(categories) {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = ""; // Clear any existing categories.

  categories.forEach((category) => {
    // Create a new button element for each category.
    const categoryElement = document.createElement("button");
    categoryElement.textContent = category.title; // Set the button text.
    categoryElement.style.color = category.text_color; // Set the text color.
    categoryElement.style.backgroundColor = category.background_color; // Set the background color.
    categoryElement.dataset.id = category.id; // Store the category ID in a data attribute.

    // Add a class for styling (you would define this class in your CSS).
    categoryElement.classList.add("category-btn");

    // Add an event listener for when this category is clicked.
    categoryElement.addEventListener("click", function () {
      // This function will toggle a class to visually indicate selection.
      this.classList.toggle("selected");

      // Any additional logic for when a category is selected or deselected goes here.
      // For example, updating a hidden input field or a JavaScript data structure.
    });

    // Append the fully configured categoryElement to the container.
    categoryContainer.appendChild(categoryElement);
  });
}
