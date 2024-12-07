import React, { useEffect , useState} from 'react';
import { Outlet, useNavigate , NavLink} from 'react-router-dom';
import {useUser, UseNotes} from '../Store/Zustand.js'
import { account , databases} from '../Appwrite/AppwriteAuth';
import { ID } from 'appwrite';


function Home() {
  const [user, setuser] = useState({});
  const navigate = useNavigate();
  const {User} = useUser();
  console.log(User);
  const SetUser = useUser((state) => state.SetUser);
  const AddNote = UseNotes((state) => state.AddNote);
  const SetNote = UseNotes((state) => state.SetNote);


  const CreateNewNote = async (User_Email) => {
    const NoteID = ID.unique();
    try {
      const result = await databases.createDocument(
        String(import.meta.env.VITE_APWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APWRITE_COLLECTION_ID),
        NoteID,
        {
          User_Email: String(User_Email),
          title: 'Title',
          content: 'text',
          Protected: false,
          Pinned: false,
          Archived: false,
        }
      );
      console.log(result);
      AddNote({
        ...result
      });
    } catch (error) {
      console.error('Failed to create new note: ', error);
    }
  
  };

  
  useEffect(()=>{
    if (!User || User.name === '' || User.name===undefined || Object.keys(User).length === 0) {
      SetNote([]);
      navigate('/login');
    }    
    else setuser(User);
  }, []);


  const handleLogout = async () => {
    try {
      await account.deleteSessions();
      SetUser({});
      setuser({});
      SetNote([]);
      console.log('User logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="w-screen min-h-screen  bg-[#202123]">
      <div className="py-2 px-5 flex justify-between items-center border-b-2 border-black/10 bg-[#202123] w-full h-[8vh]">
        <div className="flex items-center cursor-pointer"
        onClick={()=>(CreateNewNote(user.email))}>
          <img
            src="https://img.icons8.com/?size=100&id=7PRuL4Qsz7KZ&format=png&color=000000"
            alt="#"
            className="w-10"
          />
          <span className="text-2xl text-white py-2 ml-2">Notes</span>
        </div>

        <div className="flex items-center space-x-2 cursor-pointer text-white font-jaro font-normal text-base">
          <h2 className='text-4xl'>NotesCraft</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className='flex'>
          <img
            src="https://img.icons8.com/?size=100&id=GKa451kLBjuW&format=png&color=000000"
            alt="User"
            className="w-10 h-10"
          />
          <h1 className="text-2xl text-white text-center p-1">{user.name}</h1>
          </div>

          {user.name && (
          <img src="https://img.icons8.com/?size=100&id=119068&format=png&color=000000" 
          alt="logout"
          className='w-[30px] cursor-pointer'  
          onClick={()=>(handleLogout())}/>
        )}

        </div>
      </div>

      <div className="flex min-h-[92vh] ">

        {/* Left Sidebar */}
        <div className="resize-x overflow-auto min-w-[20%] h-full text-white ">
        

          <div
            className="text-center p-2 text-xl rounded-r-2xl cursor-pointer hover:bg-[#3F341F] flex justify-start"
            onClick={()=>(navigate('/'))}
          >
            <img
              src="https://img.icons8.com/?size=100&id=lNIaXGUuT4qe&format=png&color=000000"
              alt=""
              className="w-[25px] mr-6 ml-2"
            />
            <span>Notes</span>
          </div>

          <div
            className="text-center p-2 text-xl rounded-r-2xl cursor-pointer hover:bg-[#3F341F] flex justify-start"
          onClick={()=>(navigate('/pinned'))}
          >
            <img
              src="https://img.icons8.com/?size=100&id=eV5l3KvDp9vt&format=png&color=000000"
              alt=""
              className="w-[25px] mr-6 ml-2"
            />
            <span>Pinned</span>
          </div>

          <div
            className="text-center p-2 text-xl rounded-r-2xl cursor-pointer hover:bg-[#3F341F] flex justify-start"
          onClick={()=>(navigate('/archived'))} 
          >
            <img
              src="https://img.icons8.com/?size=100&id=Q1eLJEIoZrNm&format=png&color=000000"
              alt=""
              className="w-[25px] mr-6 ml-2"
            />
            <span>Archived</span>
          </div>

          
        </div>

       
        <div className='border-l-2 border-gray-600'>
        </div>
          <Outlet/>
        
      </div>

    </div>
  );
}

export default Home;
