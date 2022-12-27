import { NoteData } from "../App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void;
};

export function EditNote({ onSubmit }: EditNoteProps) {
    const note = useNote();
    return (
        <>
            <h1 className="my-4">Edit note</h1>
            <NoteForm
                title={note.title}
                markdown={note.markdown}
                onSubmit={(data) => onSubmit(note.id, data)}
            />
        </>
    );
}