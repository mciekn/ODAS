package com.odas.backend.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;


@Entity
@Table
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Note {

    @Id
    @GeneratedValue
    private Long id;

    private String content;

    private String accessLevel;

    @ElementCollection
    private List<String> noteAccessList;

    private String usernameAccessList;

}
