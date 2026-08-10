const newNoteBtn = document.getElementById("newNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");
class Note {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }

    getPreview() {
        return this.content.substring(0, 50);
    }
}
// Get saved notes from Local Storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Display notes
function displayNotes(notesToDisplay = notes) {
    notesContainer.innerHTML = "";

    notesToDisplay.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.className = "note-card";

        const noteIndex = notes.indexOf(note);

        noteCard.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <div class="note-buttons">
                <button onclick="editNote(${noteIndex})">Edit</button>
                <button onclick="deleteNote(${noteIndex})">Delete</button>
            </div>
        `;

        notesContainer.appendChild(noteCard);
    });
}

// Create a new note
newNoteBtn.addEventListener("click", function () {
    const title = prompt("Enter note title:");
    const content = prompt("Enter your note:");

    // Prevent empty notes
    if (!title || !content || title.trim() === "" || content.trim() === "") {
        alert("Please enter both a title and note content.");
        return;
    }

    const newNote = new Note(
    title.trim(),
    content.trim()
);
    notes.push(newNote);

    // Save notes to Local Storage
    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
});

// Delete a note
function deleteNote(index) {
    const confirmDelete = confirm("Are you sure you want to delete this note?");

    if (!confirmDelete) {
        return;
    }

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}

// Edit a note
function editNote(index) {
    const newTitle = prompt("Edit note title:", notes[index].title);
    const newContent = prompt("Edit note:", notes[index].content);

    if (!newTitle || !newContent || newTitle.trim() === "" || newContent.trim() === "") {
        alert("Title and content cannot be empty.");
        return;
    }

    notes[index].title = newTitle.trim();
    notes[index].content = newContent.trim();

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}

// Search notes
searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm)
    );

    displayNotes(filteredNotes);
});

// Display saved notes when the app opens
displayNotes();