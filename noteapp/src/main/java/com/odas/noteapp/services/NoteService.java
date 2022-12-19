package com.odas.noteapp.services;

import com.odas.noteapp.entities.Note;
import com.odas.noteapp.repositories.NoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;

    public Long uploadNote(MultipartFile noteFile){
        val checkNote = noteRepository.findByName(noteFile.getName());
        if (checkNote.isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT);
        }

        val note = new Note();
        note.setName(noteFile.getName());
        try{
            note.setContents(noteFile.getBytes());
        } catch(IOException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return noteRepository.save(note).getId();
    }

    public Set<String> findAll(){
        return noteRepository.findAll()
                .stream()
                .map(Note::getName)
                .collect(Collectors.toSet());
    }

    public Resource serveNote(long noteId){
        val noteBytes = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
                .getContents();

        return new ByteArrayResource(noteBytes);
    }

    public void updateNote(long noteId, MultipartFile updatedNote){
        val note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        note.setName(updatedNote.getName());
        try{
            note.setContents(updatedNote.getBytes());
        } catch(IOException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        noteRepository.save(note);
    }

    public void deleteNote(long noteId){
        val note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        noteRepository.delete(note);
    }
}
