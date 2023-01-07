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

    @ElementCollection
    private List<String> noteAccessList;

}
