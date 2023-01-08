package com.odas.backend.controllers;

import com.odas.backend.entities.Note;
import com.odas.backend.services.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping(value = "notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    Collection<Note> findAll(@AuthenticationPrincipal Jwt principal){
        log.debug("Find all notes for user with id"+principal.getSubject());
        return noteService.findAll()
                .stream()
                .filter(n -> n.getNoteAccessList().contains(principal.getSubject()) || Objects.equals(n.getAccessLevel(), "2"))
                .collect(Collectors.toList());
    }


    @GetMapping("/{id}")
    Note findById(@PathVariable Long id, @AuthenticationPrincipal Jwt principal){
        log.debug("Find note with id: {}", id);
        if(noteService.findById(id).getNoteAccessList().contains(principal.getSubject()) || Objects.equals(noteService.findById(id).getAccessLevel(), "2")){
            return noteService.findById(id);
        }
        else{
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "401");
        }
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    Note createNote(@RequestBody Note note, @AuthenticationPrincipal Jwt principal){
        log.debug("Create note: {}", note, "for user with id: {}", principal.getSubject());
        if(note.getNoteAccessList() == null) {
            note.setNoteAccessList(new ArrayList<>());
            note.getNoteAccessList().add(principal.getSubject());
        }
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
