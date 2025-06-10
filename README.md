# React App with Appwrite Backend

This is a web application built using React for the frontend and Appwrite as the backend service. The application allows users to log in with their credentials and access their personalized notes.

#### You can access the  website here : [NotesCraft](https://notescraft.netlify.app)

### Login with:

    Email: testuser@example.com
    Password: TestUserPassword123


## Technologies Used

- **Frontend**: React
- **Backend**: Appwrite
- **Authentication**: Appwrite Authentication
- **State Management**: Zustand


## Features

- User login using credentials.
- Create, update, and delete notes.
- Notes include title, content, and flags like archived, protected, and pinned.
- Data is fetched and managed via Appwrite backend services.

## Setup Instructions

To set up this project locally, follow these steps:



### 1. Clone the repository

```bash
git clone https://github.com/NeerajKumar-1044/NotesCraft.git
cd Notes_app
```
### 2. Install all required dependencies

```bash
npm install
```

### 3. Setup environment file
```
VITE_APPWRITE_ENDPOINT = "Your Appwrite Endpoints"
VITE_APWRITE_PROJECT_ID = "Your Appwrite Project Id"
VITE_APWRITE_DATABASE_ID = "Your Appwrite Database Id"
VITE_APWRITE_COLLECTION_ID = "Your Appwrite Collection Id"
```

### 4. Run project
```
npm run dev
```

