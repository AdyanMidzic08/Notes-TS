import express from "express";
import { v4 as uuidv4 } from 'uuid';
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

app.get("/", (req,res) => {
    res.send('Typescript + Express laufen');
}) 

app.post("/notes", (req,res) =>{
    const { text } = req.body;

    if(!text) {
        return res.status(400).json({error: "Text nicht gefunden"});
    }

    let note: Note = {
        id: uuidv4(),
        text,
    }

    NOTES.push(note);
    res.status(200).json({message: "Text have been successfully added"})
    saveNotes(NOTES);

    res.status(201).json(note);
})

app.delete("/notes/:id", (req,res) => {
    const id: String = req.params.id;
    const beforeLength: Number = NOTES.length;

    let newNotes: Note[] = [];
    
    for(let i = 0; i < NOTES.length; i++) {
        if(NOTES[i].id !== id) {
            newNotes.push(NOTES[i]);
        }
    }
    
    NOTES = newNotes;

    if(NOTES.length === beforeLength) {
        res.status(400).json({error: "ID nicht gefunden"})
    }else {
        saveNotes(NOTES);
        res.status(201).json({message: "successfully deleted"})
    } 

})

app.get("/notes", (req,res) => {
    res.send(NOTES);
})
export default app;