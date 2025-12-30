let addBtn = document.getElementById("addBtn") as HTMLButtonElement;
let noteInput = document.getElementById("noteInput") as HTMLInputElement;
let notesList = document.getElementById("notesList") as HTMLUListElement;
let darkModeBtn = document.getElementById("light-dark-mode") as HTMLDivElement;
let headline = document.getElementById("header") as HTMLHeadElement;

let markBtns = document.querySelectorAll(".mark-btn");
let deleteBtns = document.querySelectorAll(".delete-btn");

const url: String = "http://localhost:3000/notes";

async function addNotes(headline: string) {
  try {
    const response = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ headline }),
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
  const headline = noteInput.value.trim();
  if (!headline) return;

  await addNotes(headline);
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
                    <span>${note.headline}</span>
                    <div>
                        <button onclick='openModal("${note.id}")' class="edit-btn" style="background-color: #ffc107; color: black;">Edit/Show</button>
                        <button onclick='deleteNote("${note.id}")' class="delete-btn">Delete</button>
                    </div>
                </li>
            `;
    }

    if (document.body.classList.contains("dark-mode")) {
      applyDarkMode(true);
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
    const headline = noteInput.value.trim();
    if (!headline) return;

    addNotes(headline);
    noteInput.value = "";
    showAllNotes();
  }
});

function applyDarkMode(isDark: boolean) {
  if (isDark) {
    document.body.classList.add("dark-mode");
    headline.style.color = "white";
    notesList.style.color = "white";

    noteInput.style.backgroundColor = "black";
    noteInput.style.color = "white";

    let items = notesList.querySelectorAll("li");

    items.forEach((li) => {
      li.style.backgroundColor = "black";
    });

    darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.body.classList.remove("dark-mode");
    notesList.style.color = "black";
    headline.style.color = "black";

    noteInput.style.backgroundColor = "white";
    noteInput.style.color = "grey";

    let items = notesList.querySelectorAll("li");

    items.forEach((li) => {
      li.style.backgroundColor = "white";
    });

    darkModeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  localStorage.setItem("darkMode", isDark.toString());
}

darkModeBtn.addEventListener("click", function () {
  let isDark = !document.body.classList.contains("dark-mode");
  applyDarkMode(isDark);
});

if (localStorage.getItem("darkMode") === "true") {
  applyDarkMode(true);
}

let modal = document.getElementById("noteModal") as HTMLDivElement;
let modalContent = document.querySelector(".modal-content") as HTMLDivElement;
let closeModalBtn = document.getElementById("closeModalBtn") as HTMLSpanElement;
let modalHeadline = document.getElementById("modalHeadline") as HTMLInputElement;
let modalNoteText = document.getElementById("modalNoteText") as HTMLTextAreaElement;
let editNoteBtn = document.getElementById("editNoteBtn") as HTMLButtonElement;
let saveNoteBtn = document.getElementById("saveNoteBtn") as HTMLButtonElement;
let noteModalHeadline = document.getElementById("noteModalHeadline") as HTMLHeadingElement;
let currentNoteId: string | null = null;

(window as any).openModal = async function (id: string) {
  currentNoteId = id;
  try {
    let response = await fetch(`${url}`);
    let notes = await response.json();
    let note = notes.find((n: any) => n.id === id);

    if (darkModeBtn.innerHTML.includes("fa-sun")) {
      modal.style.backgroundColor = "#121212";
      modalContent.style.backgroundColor = "black";
      modalHeadline.style.backgroundColor = "#121212";
      modalHeadline.style.color = "white";
      modalNoteText.style.backgroundColor = "#121212";
      modalNoteText.style.color = "white";
      noteModalHeadline.style.color = "white";
    } else {
      modal.style.backgroundColor = "";
      modalContent.style.backgroundColor = "white";
      modalHeadline.style.backgroundColor = "white";
      modalHeadline.style.color = "black";
      modalNoteText.style.backgroundColor = "white";
      modalNoteText.style.color = "black";
      noteModalHeadline.style.color = "grey";
    }

    if (note) {
      modalHeadline.value = note.headline;
      modalNoteText.value = note.text || "";
      modal.style.display = "block";
      modalHeadline.readOnly = true;
      modalNoteText.readOnly = true;
      editNoteBtn.style.display = "inline-block";
      saveNoteBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching note details:", error);
  }
};

closeModalBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

editNoteBtn.onclick = function () {
  modalHeadline.readOnly = false;
  modalNoteText.readOnly = false;
  modalNoteText.focus();
  editNoteBtn.style.display = "none";
  saveNoteBtn.style.display = "inline-block";
};

saveNoteBtn.onclick = async function () {
  if (currentNoteId) {
    const newHeadline = modalHeadline.value.trim();
    const newText = modalNoteText.value.trim();
    if (!newHeadline) return;

    try {
      await fetch(`${url}/${currentNoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ headline: newHeadline, text: newText }),
      });

      modal.style.display = "none";
      await showAllNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }
};

showAllNotes();
