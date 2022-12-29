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
import java.util.Collection;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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
