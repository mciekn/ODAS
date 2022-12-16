package com.odas.noteapp.controllers;

import com.odas.noteapp.services.NoteService;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

@RestController
public class NoteController {

    @Autowired
    NoteService noteService;

    @PostMapping("/api/upload")
    public long uploadNote(@RequestParam("note")MultipartFile noteFile){
        return noteService.uploadNote(noteFile);
    }

    @GetMapping("/api/get")
    public Set<String> fetchNoteList(){
        return noteService.findAll();
    }

    @GetMapping(value = "api/get/{noteId}", produces = "text/plain")
    public Resource serveNote(@PathVariable long noteId){
        return noteService.serveNote(noteId);
    }

    @PostMapping("/api/update/{noteId}")
    public void updateNote(@PathVariable long noteId, @RequestParam("note") MultipartFile updatedNote){
        noteService.updateNote(noteId, updatedNote);
    }

    @DeleteMapping("/api/delete/{noteId}")
    public void deleteNote(@PathVariable long noteId){
        noteService.deleteNote(noteId);
    }
}
