import React from "react";
import "./CSS/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NewNote } from "./Note/NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./Note/NoteList";
import { NoteLayout } from "./Note/NoteLayout";
import { Note } from "./Note/Note";
import { EditNote } from "./Note/EditNote";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);

  function onCreateNote(data: NoteData) {
    setNotes((prevNotes) => {
      return [...prevNotes, { id: uuidV4(), ...data }];
    });
  }

  function onUpdateNote(id: string, { ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data };
        }
        return note;
      });
    });
  }

  function onDelete(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  return (
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<NoteList notes={notes} />} />
          <Route path="/new" element={<NewNote onSubmit={onCreateNote} />} />
          <Route path="/:id" element={<NoteLayout notes={notes} />}>
            <Route index element={<Note onDelete={onDelete} />} />
            <Route path="edit" element={<EditNote onSubmit={onUpdateNote} />} />
          </Route>
          <Route path="*" element={<Navigate to="/"></Navigate>} />
        </Routes>
      </Container>
  );
}

export default App;