import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {noteApi} from "../../api/noteApi";
import MarkdownIt from 'markdown-it';
import {useKeycloak} from "@react-keycloak/web";
import { AES, format, enc } from 'crypto-js';

export const NoteForm = () => {
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const {noteId} = useParams();
    const [note, setNote] = useState({
        content: '',
        accessLevel: '0',
        usernameAccessRequestList: ';'
    });
    let [renderedHTML, setRenderedHTML] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState("");

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

    const onChangeValue = (event) => {
        const accessValue = event.target.value;
        const accessLevel = event.target.name;
        setNote({...note, [accessLevel]: accessValue});
        //console.log(accessValue);
    }

    function encrypt(){
        let pswd = password;
        let md = new MarkdownIt()
        //console.log("encrypting..");
        //console.log(password);
        let enc = note.content;
        //console.log(enc);
        let cipher = AES.encrypt(enc, pswd).toString();
        setNote({...note, content: cipher});
        let renderedHTML = md.render(cipher);
        setRenderedHTML(renderedHTML);
        //console.log(cipher);
    }

    function decrypt(){
        let pswd = password;
        let md = new MarkdownIt()
        //console.log("decrypting..")
        let encrypted = note.content;
        let decrypted = AES.decrypt(encrypted, pswd).toString(enc.Utf8);
        setNote({...note, content: decrypted});
        let renderedHTML = md.render(decrypted);
        setRenderedHTML(renderedHTML);
    }

    function addShared(){
        let usernameList = users;
        //console.log(users);
        let finalUsernameList = (note.usernameAccessRequestList + usernameList + ";");
        setNote({...note, usernameAccessRequestList: finalUsernameList});
        //console.log("Usernames with access: "+finalUsernameList);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (note.id) {
            await noteApi.update(note.id, note, keycloak.token)
            //console.log(note)
        } else {
            await noteApi.create(note, keycloak.token)
            //console.log(note)
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
                    <textarea
                        class="form-control"
                        id="content-1"
                        name="content"
                        type="text"
                        value={note.content || ""}
                        onChange={handleChange}
                        autoComplete="content"></textarea>
                </FormGroup>
                <FormGroup>
                    <Label for="encrypt">Encrypt with password</Label>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="text"
                            value={password || ""}
                            onInput={e => setPassword(e.target.value)}
                        />{' '}
                        <Button color="primary" onClick={encrypt} >Encrypt</Button>{' '}
                        <Button color="secondary" onClick={decrypt} >Decrypt</Button>{' '}
                    </div>
                </FormGroup>
                <FormGroup>
                    <span class="btn-group btn-group-toggle" onChange={onChangeValue} >
                        <label className="btn btn-secondary">
                            <input type="radio" value="0" name="accessLevel" /> Private
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" value="1" name="accessLevel" /> Shared
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" value="2" name="accessLevel" /> Public
                        </label>
                    </span>
                    <span id="sharedUsers" style={{display: note.accessLevel === "1" ? 'inline' : 'none' }}> Usernames (separated with ";"):
                        <input type='text' id='users' name='users' value={users || ""} onInput={e => setUsers(e.target.value)}/>
                        <Button color="primary" onClick={addShared} >Add</Button>{' '}
                    </span>
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