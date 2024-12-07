import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const NotesStore = (set) => ({
    Notes: [],
    SetNote: (Notes) => {
        set((state) => ({
            Notes: [...Notes]
        }));
    },
    AddNote: (Note) => {
        set((state) => ({
            Notes: [...state.Notes, {...Note}],
        }));
    },
});

const UserStore = (set) => ({
    User: { name: '', email: '' },
    SetUser: (user) => {
        set((state) => ({
            User: user,
        }));
    },
});

export const UseNotes = create(
    devtools(
        persist(NotesStore, {
            name: 'Notes',
            onRehydrateStorage: () => (state) => {
                // console.log('Rehydrated Notes:', state);
            },
        })
    )
);

export const useUser = create(
    devtools(
        persist(UserStore, {
            name: 'User',
            onRehydrateStorage: () => (state) => {
                // console.log('Rehydrated User:', state);
            },
        })
    )
);
