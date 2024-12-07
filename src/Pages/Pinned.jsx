import React from 'react';
import { UseNotes } from '../Store/Zustand.js';
import NotesCard from '../Components/NotesCard.jsx';

function Pinned() {
    const Notes = UseNotes((state) => state.Notes || []);

    return (
        <div className="w-full rounded-2xl p-5">
            {Notes.length > 0 ? (
                <ul className="flex flex-wrap gap-x-4 gap-y-0">
                    {Notes.map((note, index) => 
                        note.Pinned && (
                            <li key={index}>
                                <NotesCard
                                    id={note.$id}
                                    text={note.content}
                                    title={note.title}
                                    details={{ encrypt: note.Protected, pinned: note.Pinned }}
                                />
                            </li>
                        )
                    )}
                </ul>
            ) : (
                <p>No notes available or loading...</p>
            )}
        </div>
    );
}

export default Pinned;
