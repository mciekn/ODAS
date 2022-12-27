import { FormEvent, useRef } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NoteData } from "../App";

type NoteFormProps = {
    onSubmit: (note: NoteData) => void;
} & Partial<NoteData>;

export function NoteForm({
                             onSubmit,
                             title = "",
                             markdown = "",
                         }: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
        });

        navigate("..");
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={3}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                ref={titleRef}
                                defaultValue={title}
                                placeholder="Enter title"
                                data-e2e="title field"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        ref={markdownRef}
                        defaultValue={markdown}
                        rows={15}
                        data-e2e="body field"
                    />
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit" variant="primary" data-e2e="save button">
                        Save
                    </Button>
                    <Link to="..">
                        <Button
                            type="button"
                            data-e2e="cancel button"
                            variant="outline-secondary"
                        >
                            Cancel
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    );
}