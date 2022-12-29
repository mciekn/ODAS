package com.odas.backend.controllers;

import com.odas.backend.entities.Note;
import com.odas.backend.services.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@Slf4j
@RestController
@RequestMapping(value = "notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    Collection<Note> findAll(){
        log.debug("Find all notes");
        return noteService.findAll();
    }


    @GetMapping("/{id}")
    Note findById(@PathVariable Long id){
        log.debug("Find note with id: {}", id);
        return noteService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Note createNote(@RequestBody Note note){
        log.debug("Create note: {}", note);
        return noteService.save(note);
    }

    @PutMapping("/{id}")
    Note update(@PathVariable Long id, @RequestBody Note note){
        log.debug("Find note with id: {}, with note {}", id, note);
        return noteService.update(id, note);
    }

    @DeleteMapping("/{id}")
    void deleteNote(@PathVariable Long id){
        log.debug("Delete note with id: {}", id);
        noteService.deleteById(id);
    }
}
