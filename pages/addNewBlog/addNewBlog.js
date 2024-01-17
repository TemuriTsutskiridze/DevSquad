function getDate() {
  let dateToday = document.getElementById("date");

  let today = new Date();
  let day = `${today.getDate() < 10 ? "0" : ""}${today.getDate()}`;
  let month = `${today.getMonth() + 1 < 10 ? "0" : ""}${today.getMonth() + 1}`;
  let year = today.getFullYear();

  dateToday.value = `${year}-${month}-${day}`;
}

getDate();

// const dropArea = document.getElementsByClassName("file-drag-area");
// const inputFile = document.getElementById("input-file");
// function dragAndDrop() {}

// dragAndDrop();

// dropArea.addEventListener("dragover", function (event) {
//   event.preventDefault();
// });

// dropArea.addEventListener("drop", function (event) {
//   event.preventDefault();
//   inputFile.files = event.dataTransfer.files;
// });

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

["dragenter", "dragover"].forEach((eventName) => {
  fileDragArea.addEventListener(
    eventName,
    () => fileDragArea.classList.add("highlight"),
    false
  );
});

["dragleave", "drop"].forEach((eventName) => {
  fileDragArea.addEventListener(
    eventName,
    () => fileDragArea.classList.remove("highlight"),
    false
  );
});

fileDragArea.addEventListener("drop", function (e) {
  const dt = e.dataTransfer;
  const file = dt.files[0];

  updateUIWithFile(file);
  imageInput.files = dt.files;
});

// category choice

document.addEventListener("DOMContentLoaded", () => {
  const selectBox = document.querySelector(".select-box");
  const optionsContainer = document.querySelector(".options-container");
  const selectedItemsSpan = document.querySelector(".selected-items");
  const selectElement = document.getElementById("category");
  const options = selectElement.querySelectorAll("option");

  // Function to update the select box display and the original select element
  function updateSelectBox() {
    const selectedOptions = Array.from(selectElement.selectedOptions).map(
      (option) => option.text
    );
    selectedItemsSpan.innerHTML = selectedOptions
      .map(
        (text) =>
          `<span class="tag">${text}<span class="remove">&times;</span></span>`
      )
      .join("");
    // Show placeholder text if nothing is selected
    if (selectedOptions.length === 0) {
      selectedItemsSpan.textContent = "აირჩიე კატეგორია";
    }
  }

  // Toggle options display
  selectBox.addEventListener("click", () => {
    optionsContainer.hidden = !optionsContainer.hidden;
  });

  // Insert options into the custom options container
  options.forEach((option) => {
    if (option.disabled) return; // Skip placeholder option
    const div = document.createElement("div");
    div.textContent = option.text;
    div.setAttribute("class", "option-item");
    div.dataset.value = option.value;
    div.addEventListener("click", () => {
      option.selected = !option.selected; // Toggle selection
      div.classList.toggle("selected", option.selected); // Toggle class for styling
      updateSelectBox(); // Update display
    });
    optionsContainer.appendChild(div);
  });

  // Remove tag handler
  selectedItemsSpan.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
      const valueToRemove = event.target.parentNode.textContent
        .replace("×", "")
        .trim();
      options.forEach((option) => {
        if (option.text === valueToRemove) {
          option.selected = false; // Unselect the option
        }
      });
      updateSelectBox(); // Update display
    }
  });

  // Initial update in case there are preselected values
  updateSelectBox();
});
