import express from "express";
import { v4 as uuidv4 } from "uuid";
import { Note } from "./types";
import { loadNotes, saveNotes } from "./storage";
import { error } from "node:console";

const app = express();
app.use(express.json());
app.use(express.static("public"));

let NOTES: Note[] = [];

async function initNotes() {
  NOTES = await loadNotes();
}

initNotes();

app.get("/", (req, res) => {
  res.send("Typescript + Express laufen");
});

app.post("/notes", (req, res) => {
  const { headline } = req.body;

  if (!headline) {
    return res.status(400).json({ error: "Headline nicht gefunden" });
  }

  let note: Note = {
    id: uuidv4(),
    headline,
    text: "",
  };

  NOTES.push(note);
  saveNotes(NOTES);
  res.status(201).json(note);
});

app.delete("/notes/:id", (req, res) => {
  const id: String = req.params.id;
  const beforeLength: Number = NOTES.length;

  let newNotes: Note[] = [];

  for (let i = 0; i < NOTES.length; i++) {
    if (NOTES[i].id !== id) {
      newNotes.push(NOTES[i]);
    }
  }

  NOTES = newNotes;

  if (NOTES.length === beforeLength) {
    res.status(400).json({ error: "ID nicht gefunden" });
  } else {
    saveNotes(NOTES);
    res.status(201).json({ message: "successfully deleted" });
  }
});

app.put("/notes/:id", (req, res) => {
  const id = req.params.id;
  const { headline, text } = req.body;

  let noteIndex = -1;

  for (let i = 0; i < NOTES.length; i++) {
    if (NOTES[i].id === id) {
      noteIndex = i;
      break;
    }
  }

  if (noteIndex === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  if (headline) NOTES[noteIndex].headline = headline;
  if (text !== undefined) NOTES[noteIndex].text = text;

  saveNotes(NOTES);

  res.status(200).json(NOTES[noteIndex]);
});

app.get("/notes", (req, res) => {
  res.send(NOTES);
});
export default app;
