import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { databases } from '../Appwrite/AppwriteAuth';

function Notes() {

  const { id } = useParams();
  // console.log(id);
  
  const navigate = useNavigate();

  const [Note, setNote] = useState({
          User_Email: '',
          title: 'Title',
          content: 'text',
          Protected: false,
          Pinned: false,
          Archived: false,
  })

  const UpdateNote = async () => {
    try {
      const result = await databases.updateDocument(
        String(import.meta.env.VITE_APWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APWRITE_COLLECTION_ID),
        id,
        {
          User_Email: Note.User_Email,
          title: Note.title,
          content: Note.content,
          Protected: Note.Protected,
          Pinned: Note.Pinned,
          Archived: Note.Archived,},
      );
      // console.log(result);
    } catch (error) {
      console.error('failed to update note: ', error);
    }
  }

  const GetNote = async () => {
    try {
      const result = await databases.getDocument(
        String(import.meta.env.VITE_APWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APWRITE_COLLECTION_ID),
        id
      );
      // console.log(result);
      setNote({
        User_Email: result.User_Email,
        title: result.title,
        content: result.content,
        Protected: result.Protected,
        Pinned: result.Pinned,
        Archived: result.Archived,
      });
    } catch (error) {
      console.error('failed to get note: ', error);
    }
  }

  const DeleteNote = async () => {
    try {
      const result = await databases.deleteDocument(
        String(import.meta.env.VITE_APWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APWRITE_COLLECTION_ID),
        id,
      );
      // console.log(result);
      navigate('/')
    } catch (error) {
      console.error('failed to delete note: ', error);
    }
  }

  useEffect(() => {
    GetNote();
  }, [id]);

  
  return (
    <div className="w-full h-full p-4 bg-[#202123] ">
          <div className="border-2 border-gray-400 rounded-2xl flex flex-grow text-white flex-col w-full h-full ">
             
              {/* Header Area */}
                  <div className="flex justify-between items-center mb-4 w-full">
                      <div className="flex justify-center w-full mx-2 p-3 text-3xl">
                          <input
                              type="text"
                              placeholder="Title"
                              className="bg-[rgb(55,51,44)] rounded-xl text-center py-1 w-full focus:outline-none"
                              value={Note.title}
                              onChange={(e) => setNote({...Note, title: e.target.value})}
                          />
                      </div>
                      {Note.Pinned?(
                        <img
                        src="https://img.icons8.com/?size=100&id=3JXVvdRaKEdU&format=png&color=000000"
                        alt="Unpin"
                        aria-label="Unpin"
                        className="h-[45px] mr-1 hover:scale-110 hover:opacity-90 transition-transform duration-150 cursor-pointer"
                        onClick={()=>(setNote({...Note, Pinned: false}))}
                    />
                      ):(
                        <img
                        src="https://img.icons8.com/?size=100&id=Cl0BYMUbkFMN&format=png&color=000000"
                        alt="pin"
                        aria-label="pin"
                        className="h-[45px] mr-1 hover:scale-110 hover:opacity-90 transition-transform duration-150 cursor-pointer"
                        onClick={()=>(setNote({...Note, Pinned: true}))}
                    />
                      )}
                  </div>

              {/* Text Area */}
                  
                  <div className=" flex-grow mx-2 border border-slate-400 rounded-2xl">
                      <textarea
                          type="text"
                          placeholder="Text"
                          className="bg-inherit  w-full h-full p-2 focus:outline-none text-center text-xl overflow-auto"
                          value={Note.content}
                          onChange={(e) => setNote({...Note, content: e.target.value})}
                      />
                  </div>

              {/* Footer Area */}

              <div className='flex justify-between mx-2 mt-2 mb-1 p-1'>
                
                {/* Icons */}

                <div className='flex justify-start gap-4'>
                  
                  <img
                    src="https://img.icons8.com/?size=100&id=13428&format=png&color=000000"
                    alt="archive"
                    aria-label="archive"
                    className= {`w-[35px] ${Note.Archived?"opacity-30":""} hover:scale-110 transition-transform duration-150 cursor-pointer`}
                    onClick={()=>(setNote({...Note, Archived: Note.Archived?false:true}))}
                  />
                  <img
                    src="https://img.icons8.com/?size=100&id=102350&format=png&color=000000"
                    alt="delete"
                    aria-label="delete"
                    className="w-[35px] hover:scale-110 hover:opacity-90 transition-transform duration-150 cursor-pointer"
                    onClick={()=>(DeleteNote())}
                  />

                  {Note.Protected?(<img
                    src="https://img.icons8.com/?size=100&id=wSoNdWaw8C5w&format=png&color=000000"
                    alt="Protected"
                    aria-label="Protected"
                    className="w-[35px] hover:scale-110 hover:opacity-90 transition-transform duration-150 cursor-pointer"
                    onClick={()=>(setNote({...Note, Protected: false}))}
                  />):(<img
                    src="https://img.icons8.com/?size=100&id=1F5Aok9b4nxz&format=png&color=000000"
                    alt="Protected"
                    aria-label="Protected"
                    className="w-[35px] hover:scale-110 hover:opacity-90 transition-transform duration-150 cursor-pointer"
                    onClick={()=>(setNote({...Note, Protected: true}))}
                  />
                  )}
                </div>

                <div className='flex justify-between gap-3'>

                <img
                    src="https://img.icons8.com/?size=100&id=3L8eQO8sI0yM&format=png&color=000000"
                    alt="save"
                    aria-label="save"
                    className="w-[35px] hover:scale-110 hover:opacity-90 transition-transform duration-150 cursor-pointer"
                    onClick={()=>(UpdateNote())}
                  />
                <img
                    src="https://img.icons8.com/?size=100&id=GhvBtzNnBL71&format=png&color=000000"
                    alt="close"
                    aria-label="close"
                    className="w-[35px] hover:scale-110 hover:opacity-90 transition-transform duration-150 cursor-pointer"
                    onClick={()=>(UpdateNote(), navigate('/'))}
                  />
                </div>

              </div>


              </div>
          </div>
  )
}

export default Notes