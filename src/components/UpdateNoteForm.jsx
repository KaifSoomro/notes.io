import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";

const UpdateNoteForm = ({ isOpen, onClose, noteData, onSubmit, loading }) => {
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateColor, setUpdateColor] = useState("");

  useEffect(() => {
    if (noteData) {
      setUpdateTitle(noteData.heading || '');
      setUpdateDescription(noteData.paragraph || '');
      setUpdateColor(noteData.noteColor || "bg-amber-100");
    } else {

      setUpdateTitle("");
      setUpdateDescription("");
      setUpdateColor("bg-amber-100");
    }
  }, [noteData, isOpen]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updateTitle || !updateDescription) {
      alert("Please enter both title and description.");
      return;
    }

    if (!noteData?._id) {
      console.error("No note ID found for update.");
      return;
    }

    const updatedNote = {
      heading: updateTitle,
      paragraph: updateDescription,
      noteColor: updateColor
    };

    await onSubmit(noteData._id, updatedNote); 
  };

  if (!isOpen) return null;

  return (
    <div className='w-full h-screen bg-neutral-900/80 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='w-full md:w-[550px] h-[330px] md:h-[370px] bg-amber-100 rounded-md pt-5 relative text-neutral-950'>
        <button type="button" onClick={onClose} className='absolute top-5 right-5 text-3xl cursor-pointer text-neutral-900'>
          <IoClose />
        </button>

        <input
          type="text"
          placeholder='Update Title'
          onChange={(e) => setUpdateTitle(e.target.value)}
          value={updateTitle}
          className='w-full h-10 text-neutral-950 outline-none border-none px-3 md:px-7 pt-2 text-xl md:text-2xl bg-transparent'
        />
        <textarea
          rows={10}
          cols={40}
          placeholder='Update Description'
          onChange={(e) => setUpdateDescription(e.target.value)}
          value={updateDescription}
          className='w-full max-h-50 leading-5 text-neutral-950 outline-none border-none px-3 md:px-7 pt-2 text-sm md:text-lg bg-transparent'
        />
        <div className='w-full flex items-center justify-between'>
          {loading ? (
            <h1 className='px-5 py-2 ms-7 text-lg text-neutral-900'>Updating...</h1>
          ) : (
            <button
              type='submit'
              className='px-4 md:px-5 py-2 me-3 md:me-15 bg-neutral-800 text-white rounded ms-7 cursor-pointer'
              disabled={loading}
            >
              Update
            </button>
          )}

          <div className='w-full h-10 flex gap-3 md:gap-5 justify-end pe-7'>
            <div onClick={() => setUpdateColor("bg-teal-500")} className='w-8 md:w-10 h-8 md:h-10 bg-teal-500 rounded-full cursor-pointer'></div>
            <div onClick={() => setUpdateColor("bg-yellow-500")} className='w-8 md:w-10 h-8 md:h-10 bg-yellow-500 rounded-full cursor-pointer'></div>
            <div onClick={() => setUpdateColor("bg-pink-500")} className='w-8 md:w-10 h-8 md:h-10 bg-pink-500 rounded-full cursor-pointer'></div>
            <div onClick={() => setUpdateColor("bg-neutral-500")} className='w-8 md:w-10 h-8 md:h-10 bg-neutral-500 rounded-full cursor-pointer'></div>
            <div onClick={() => setUpdateColor("bg-lime-500")} className='w-8 md:w-10 h-8 md:h-10 bg-lime-500 rounded-full cursor-pointer'></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateNoteForm;