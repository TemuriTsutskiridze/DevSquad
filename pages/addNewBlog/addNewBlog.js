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
function updateUI(file) {
  fileNameDisplay.textContent = file.name;
  fileInfo.style.display = "flex"; // Set display to flex for fileInfo
  fileContainer.style.display = "none"; // Hide the file drag area by setting display to none
}

// Event listener for uploading file
imageInput.addEventListener("change", function (event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    updateUI(file);
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

  updateUI(file);
  imageInput.files = dt.files;
});

// ------------------ category choice ----------------

const authorInput = document.getElementById("author-input");

function getMinLength(input, minLength) {
  return input.value.length >= minLength;
}

function minWords(input, minWords) {
  const words = input.value.trim().split(/\s+/);
  return words.length >= minWords;
}

function geoAlphabet(input) {
  const geoRegex = /^[\u10A0-\u10FF\s]+$/;
  return geoRegex.test(input.value.trim()) || input.value.trim() === "";
}

function validateAuthorInput(input) {
  const minLengthValid = getMinLength(input, 4);
  const minWordsValid = minWords(input, 2);
  const geoAlphabetValid = geoAlphabet(input);

  return minLengthValid && minWordsValid && geoAlphabetValid;
}

authorInput.addEventListener("input", function () {
  const minLengthValid = getMinLength(this, 4);
  const minWordsValid = minWords(this, 2);
  const geoAlphabetValid = geoAlphabet(this);

  updateUI(this, minLengthValid, minWordsValid, geoAlphabetValid);
});

function updateUI(input, minLengthValid, minWordsValid, geoAlphabetValid) {
  const inputNotEmpty = input.value.trim() !== "";

  // Function to update individual error message style
  const updateErrorMessage = (elementId, isValid) => {
    const element = document.getElementById(elementId);
    element.style.color = inputNotEmpty && !isValid ? "red" : ""; // Update text color
  };

  // Update each error message
  updateErrorMessage("minLengthError", minLengthValid);
  updateErrorMessage("minWordsError", minWordsValid);
  updateErrorMessage("geoAlphabetError", geoAlphabetValid);

  // Update input border color
  // If all validations are true, set to green, otherwise set to red
  input.style.borderColor =
    inputNotEmpty && minLengthValid && minWordsValid && geoAlphabetValid
      ? ""
      : "red";
  input.style.backgroundColor =
    minLengthValid && minWordsValid && geoAlphabetValid ? "" : "#FAF2F3";
}
