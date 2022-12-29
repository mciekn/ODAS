package com.odas.noteapp.controllers;

import com.odas.noteapp.entities.Note;
import com.odas.noteapp.services.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping(value = "notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    Collection<Note> findAll() {
        log.debug("Find all notes");
        return noteService.findAll();
    }


    @GetMapping("/{id}")
    Note findById(@PathVariable Long id) {
        log.debug("Find package with id: {}", id);
        return noteService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Note createNote(@RequestBody Note note) {
        log.debug("Create package: {}", note);
        return noteService.save(note);
    }

    @PutMapping("/{id}")
    Note update(@PathVariable Long id, @RequestBody Note note) {
        log.debug("Find package with id: {}, with package {}", id, note);
        return noteService.update(id, note);
    }

    @DeleteMapping("/{id}")
    void deleteNote(@PathVariable Long id) {
        log.debug("Delete package with id: {}", id);
        noteService.deleteById(id);
    }
}
