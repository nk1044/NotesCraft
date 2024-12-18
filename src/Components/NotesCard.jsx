import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotesCard({id, text = "text", title = "Title", details = { encrypt: false, pinned: false} }) {
    const dummytext = details.encrypt
      ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, mi sit"
      : text;
      const navigate = useNavigate();
  
    return (
      <div className="bg-[#272013] border border-[#272013] hover:bg-[#3a301d] rounded-2xl md:w-[210px] w-full md:h-[180px] sm:h-[100px] h-[70px] p-4 text-gray-200 shadow-md hover:shadow-lg 
      transition-all duration-300 cursor-pointer inline-block mt-5 "
      onClick={()=>(navigate(`/notes/${id}`))}>

        <div className="text-center text-xl font-semibold truncate w-[100%] overflow-hidden">{title}</div>
  
        <div
          className={`mt-3 text-gray-300 text-sm h-[53px] overflow-hidden px-2 text-center md:block hidden ${
            details.encrypt && "blur-sm"
          }`}
        >
          {dummytext}
        </div>
  
        <div className="w-full mt-5 flex justify-between items-center gap-3">
          {details.pinned ? (
            <img
              src="https://img.icons8.com/?size=100&id=3JXVvdRaKEdU&format=png&color=000000"
              alt="Pin"
              aria-label="Pin"
              className="w-[24px] hover:scale-110 hover:opacity-90 transition-transform duration-150 cursor-pointer"
            />
          ) : (
            <img
              src="https://img.icons8.com/?size=100&id=Cl0BYMUbkFMN&format=png&color=000000"
              alt="Unpin"
              aria-label="Unpin"
              className="w-[24px] hover:scale-110 hover:opacity-90 transition-transform duration-150 cursor-pointer"
            />
          )}
  
          
        </div>
      </div>
    );
  }
  
  export default NotesCard;
  