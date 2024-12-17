const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Array of background colors for notes
const noteColors = ["#FFEBEE", "#E3F2FD", "#E8F5E9", "#FFFDE7", "#F3E5F5", "#E0F7CC"];
let colorIndex = 0; // To track the current color index

// Function to load notes from local storage
function showLocalStorageNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notesContainer.innerHTML = storedNotes; // Load saved notes
    attachEventToExistingNotes(); // Add event listeners to existing notes
  }
}
showLocalStorageNotes();

// Function to save notes to local storage
function noteStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Function to attach keyup event to existing notes
function attachEventToExistingNotes() {
  const inputBoxes = document.querySelectorAll(".input-box");
  inputBoxes.forEach((inputBox) => {
    inputBox.addEventListener("keyup", noteStorage);
  });
}

// Function to create a new note
createBtn.addEventListener("click", () => {
  let noteWrapper = document.createElement("div");
  noteWrapper.className = "note-wrapper";

  // Set a background color dynamically
  noteWrapper.style.backgroundColor = noteColors[colorIndex];
  colorIndex = (colorIndex + 1) % noteColors.length; // Cycle to the next color

  let inputBox = document.createElement("p");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", true);
 

  inputBox.addEventListener("keyup", noteStorage); // Save changes to storage on edit

  let img = document.createElement("img");
  img.src = "images/delete.png";
  img.className = "delete-btn";

  // Append elements
  //notesContainer>noteswrapper>inputbox>delete
  noteWrapper.appendChild(inputBox);
  noteWrapper.appendChild(img);
  notesContainer.appendChild(noteWrapper);


  noteStorage(); // Save the updated notes list
});

// Event listener for delete button
notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.classList.contains("delete-btn")) {
    e.target.closest(".note-wrapper").remove(); // Remove the note
    noteStorage(); // Update local storage
  }
});

document.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    document.execCommand("insertLineBreak");
    e.preventDefault()
  }
})