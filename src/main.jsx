import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import NotesPreview from './Pages/NotesPreview.jsx';
import AllNotes from './Pages/AllNotes.jsx';
import Pinned from './Pages/Pinned.jsx';
import Archived from './Pages/Archived.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          { path: '', element: <AllNotes /> },
          { path: 'notes/:id', element: <NotesPreview /> },
          { path: 'pinned', element: <Pinned /> },
          { path: 'archived', element: <Archived /> },
        ],
      },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
