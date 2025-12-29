let addBtn = document.getElementById("addBtn") as HTMLButtonElement;
let noteInput = document.getElementById("noteInput") as HTMLInputElement;
let notesList = document.getElementById("notesList") as HTMLUListElement;

let markBtns = document.querySelectorAll(".mark-btn");
let deleteBtns = document.querySelectorAll(".delete-btn");

const url: String = "http://localhost:3000/notes";

async function addNotes(text: string) {
  try {
    const response = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Fehler beim Hinzufügen:", error);
      return;
    }
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

addBtn.addEventListener("click", async () => {
  const text = noteInput.value.trim();
  if (!text) return;

  await addNotes(text);
  noteInput.value = "";
  await showAllNotes();
});

async function showAllNotes() {
  try {
    let response = await fetch(`${url}`);
    let notes = await response.json();

    notesList.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
      let note = notes[i];
      notesList.innerHTML += `
                <li data-id="${note.id}">
                    <span>${note.text}</span>
                    <div>
                        <button onclick='deleteNote("${note.id}")' class="delete-btn">Delete</button>
                    </div>
                </li>
            `;
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteNote(id: String) {
  let response = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });
  await showAllNotes();
}

noteInput.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const text = noteInput.value.trim();
    if (!text) return;

    addNotes(text);
    noteInput.value = "";
    showAllNotes();
  }
});

showAllNotes();
