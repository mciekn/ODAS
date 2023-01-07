import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {NavBar} from "./components/NavBar";
import {Home} from "./pages/home/Home";
import {NotePage} from "./pages/notes/NotePage";
import {NoteForm} from "./pages/note/NoteForm";
import {ProtectedRoute} from "./components/ProtectedRoute";

export default function App(){
    return (
        <>
            <NavBar/>
            <Routes>
                <Route index element={<Home/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path='/notes' element={<NotePage/>}/>
                    <Route path='/notes/:noteId' element={<NoteForm/>}/>
                </Route>
            </Routes>
        </>
    )
}