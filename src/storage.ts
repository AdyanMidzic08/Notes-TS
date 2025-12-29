import { promises as fs } from "fs";
import path from "path";
import { Note } from "./types";

const FILE_PATH = path.join(__dirname, "..", "notes.json"); 

export async function loadNotes(): Promise<Note[]> {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data) as Note[];
  } catch (err) {
    console.log("notes.json nicht gefunden oder leer → leeres Array");
    return [];
  }
}

export async function saveNotes(notes: Note[]): Promise<void> {
  await fs.writeFile(FILE_PATH, JSON.stringify(notes, null, 2), "utf-8");
}