import React, { useEffect, useState } from 'react';
import { useUser } from '../Store/Zustand.js';
import { Query } from 'appwrite';
import { databases } from '../Appwrite/AppwriteAuth.js';
import NotesCard from '../Components/NotesCard.jsx';
import {UseNotes} from '../Store/Zustand.js'

function AllNotes() {
    const { User } = useUser();
    const User_Email = String(User?.email || '');

    const SetNote = UseNotes((state) => state.SetNote);
    const Notes = UseNotes((state) => state.Notes || []);

    const GetNotes = async () => {
        try {
            const result = await databases.listDocuments(
                String(import.meta.env.VITE_APWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APWRITE_COLLECTION_ID),
                [Query.equal('User_Email', User_Email)]
            );
            // console.log('Fetched documents:', result.documents);
            if (Array.isArray(result.documents)) {
                SetNote(result.documents);
            } else {
                console.error('Invalid response:', result.documents);
                SetNote([]);
            }
        } catch (error) {
            console.error('Failed to get notes:', error);
            SetNote([]);
        }
    };

    useEffect(() => {
        GetNotes();
    }, []);

    return (
        <div className="w-full rounded-2xl p-5">
            {Notes.length > 0 ? (
                <ul className="flex flex-wrap gap-x-4 gap-y-0">
                    {Notes.map((note, index) => (
                        !note.Archived && (
                        <li key={index}>
                            <NotesCard
                                id={note.$id}
                                text={note.content}
                                title={note.title}
                                details={{ encrypt: note.Protected, pinned: note.Pinned }}
                            />
                        </li>)
                    ))}
                </ul>
            ) : (
                <p>No notes available or loading...</p>
            )}
        </div>
    );
}

export default AllNotes;
