import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {noteApi} from "../../api/noteApi";

export const NoteForm = () => {
    const navigate = useNavigate();
    const {noteId} = useParams();
    const [note, setNote] = useState({
        content: ''
    });

    useEffect(() => {
        if (noteId !== 'new') {
            noteApi.getById(noteId)
                .then((res) => {
                    setNote(res.data);
                });
        }
    }, [noteId]);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const content = target.name;

        setNote({...note, [content]: value,});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (note.id) {
            await noteApi.update(note.id, note)
        } else {
            await noteApi.create(note)
        }
        navigate('/notes')
    }

    const title = <h2>{note.id ? 'Edit note' : 'Add note'}</h2>;

    return (
        <Container>
            {title}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="content">Content</Label>
                    <Input
                        id="content-1"
                        name="content"
                        type="text"
                        value={note.content || ""}
                        onChange={handleChange}
                        autoComplete="content"/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/notes">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    )
}