package com.odas.noteapp.services;

import com.odas.noteapp.entities.Note;
import com.odas.noteapp.repositories.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;

    public Set<String> findAll(){
        return noteRepository.findAll()
                .stream()
                .map(Note::getName)
                .collect(Collectors.toSet());
    }
}
