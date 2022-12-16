package com.odas.noteapp.repositories;

import com.odas.noteapp.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    Optional<Note> findById(long id);
    Optional<Note> findByName(String name);
}
