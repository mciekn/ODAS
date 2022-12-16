package com.odas.noteapp.controllers;

import com.odas.noteapp.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
public class NoteController {

    @Autowired
    NoteService noteService;

    @GetMapping("/api/get")
    public Set<String> fetchNoteList(){
        return noteService.findAll();
    }
}
