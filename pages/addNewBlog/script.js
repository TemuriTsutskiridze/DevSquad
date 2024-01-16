function getDate() {
  let dateToday = document.getElementById("date");

  let today = new Date();
  let day = `${today.getDate() < 10 ? "0" : ""}${today.getDate()}`;
  let month = `${today.getMonth() + 1 < 10 ? "0" : ""}${today.getMonth() + 1}`;
  let year = today.getFullYear();

  dateToday.value = `${year}-${month}-${day}`;
}

getDate();

const dropArea = document.getElementsByClassName("file-drag-area");
const inputFile = document.getElementById("input-file");
function dragAndDrop() {}

dragAndDrop();

dropArea.addEventListener("dragover", function (event) {
  event.preventDefault();
});

dropArea.addEventListener("drop", function (event) {
  event.preventDefault();
  inputFile.files = event.dataTransfer.files;
});
