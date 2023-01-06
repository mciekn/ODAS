import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {noteApi} from "../../api/noteApi";
import MarkdownIt from 'markdown-it';
import {useKeycloak} from "@react-keycloak/web";

export const NoteForm = () => {
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const {noteId} = useParams();
    const [note, setNote] = useState({
        content: ''
    });
    let [renderedHTML, setRenderedHTML] = useState("");

    useEffect(() => {
        if (noteId !== 'new') {
            let md = new MarkdownIt()
            noteApi.getById(noteId, keycloak.token)
                .then((res) => {
                    setNote(res.data);
                    let renderedHTML = md.render(res.data.content);
                    setRenderedHTML(renderedHTML);
                });
        }
        keycloak.updateToken()
    }, [noteId]);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const content = target.name;

        setNote({...note, [content]: value,});

        let md = new MarkdownIt()
        let renderedHTML = md.render(value);
        setRenderedHTML(renderedHTML);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (note.id) {
            await noteApi.update(note.id, note, keycloak.token)
        } else {
            await noteApi.create(note, keycloak.token)
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
                <FormGroup>
                    <Label for="markdown">Rendered MD</Label>
                    <div
                        dangerouslySetInnerHTML={{ __html: renderedHTML }}
                        className="rendered-html-output"
                    >
                    </div>
                </FormGroup>
            </Form>
        </Container>
    )
}