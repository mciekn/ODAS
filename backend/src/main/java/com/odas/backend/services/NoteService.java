package com.odas.backend.services;

import com.odas.backend.entities.Note;
import com.odas.backend.repositories.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public Collection<Note> findAll(){
        return noteRepository.findAll();
    }

    public Note save(Note note){
        if(note.getId()!= null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Provide package without id");
        }

        return noteRepository.save(note);
    }


    public Note findById(Long id){
        return noteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found"));
    }

    public Note update(Long id, Note note){
        if(!Objects.equals(id, note.getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id and package.id is not equal");
        }
        return noteRepository.save(note);
    }

    public void deleteById(Long id){
        noteRepository.deleteById(id);
    }

}
