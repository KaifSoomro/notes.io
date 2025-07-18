import React, { useEffect } from 'react';
import { IoClose, IoPencil } from "react-icons/io5";
import { useSelector } from 'react-redux'; 

const NoteCard = ({ note, onDelete, onEdit }) => {
  const loading = useSelector((state) => state.notes.status === 'loading'); 

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note._id); 
    }
  };

  const handleEditClick = () => {
    onEdit(note._id); 
  };

  return (
    <div className={`w-full md:w-[430px] h-[300px] ${note?.noteColor || "bg-blue-500"} rounded-md p-5 relative shadow-md mx-auto`}>
      <button
        onClick={handleDeleteClick}
        className='absolute top-5 right-5 text-3xl cursor-pointer text-neutral-900'
        disabled={loading} 
      >
        <IoClose />
      </button>

      <button
        onClick={handleEditClick}
        className='absolute bottom-5 left-5 text-xl md:text-2xl cursor-pointer bg-neutral-900 hover:bg-neutral-800 p-2 md:p-3 rounded-full shadow-md text-white'
        disabled={loading} 
      >
        <IoPencil />
      </button>

      <h1 className='text-xl md:text-3xl text-neutral-900'>{note?.heading}</h1>
      <p className='pt-5 text-sm md:text-lg text-neutral-900'>{note?.paragraph}</p>
    </div>
  );
};

export default NoteCard;