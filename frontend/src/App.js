import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {NavBar} from "./components/NavBar";
import {NotePage} from "./pages/notes/NotePage";
import {NoteForm} from "./pages/note/NoteForm";
import {ProtectedRoute} from "./components/ProtectedRoute";

export default function App(){
    return (
        <>
            <NavBar/>
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route path='/notes' index element={<NotePage/>}/>
                    <Route path='/notes/:noteId' element={<NoteForm/>}/>
                </Route>
            </Routes>
        </>
    )
}