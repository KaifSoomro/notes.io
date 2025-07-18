import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";

const NoteForm = ({ isOpen, onClose, onSubmit, loading }) => { 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState("bg-amber-100"); 

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setColor("bg-amber-100");
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please enter both title and description.");
      return;
    }

    const noteData = {
      heading: title,
      paragraph: description,
      noteColor: color
    };

    await onSubmit(noteData); 
  };

  if (!isOpen) return null;

  return (
    <div className='w-full h-screen bg-neutral-900/80 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 flex items-center justify-center px-3 md:px-0'>
      <form onSubmit={handleSubmit} className='w-full md:w-[550px] h-[330px] md:h-[370px] bg-amber-100 rounded-md pt-5 relative text-neutral-950'>
        <button type="button" onClick={onClose} className='absolute top-5 right-5 text-3xl cursor-pointer text-neutral-900'>
          <IoClose />
        </button>

        <input
          type="text"
          placeholder='Add Title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='w-full h-10 text-neutral-950 outline-none border-none px-3 md:px-7 pt-2 text-xl md:text-2xl bg-transparent'
        />
        <textarea
          rows={10}
          cols={40}
          placeholder='Add Description'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full max-h-50 leading-5 text-neutral-950 outline-none border-none px-3 md:px-7 pt-2 text-sm md:text-lg bg-transparent'
        />
        <div className='w-full flex items-center justify-between'>
          {loading ? (
            <h1 className='px-5 py-2 ms-7 text-lg text-neutral-900'>Adding...</h1>
          ) : (
            <button
              type='submit'
              className='px-4 md:px-5 py-2 me-3 md:me-15 bg-neutral-800 text-white rounded ms-7 cursor-pointer'
              disabled={loading}
            >
              Add
            </button>
          )}

          <div className='w-full h-10 flex gap-3 md:gap-5 justify-end pe-7'>
            <div onClick={() => setColor("bg-teal-500")} className='w-8 md:w-10 h-8 md:h-10 bg-teal-500 rounded-full cursor-pointer'></div>
            <div onClick={() => setColor("bg-yellow-500")} className='w-8 md:w-10 h-8 md:h-10 bg-yellow-500 rounded-full cursor-pointer'></div>
            <div onClick={() => setColor("bg-pink-500")} className='w-8 md:w-10 h-8 md:h-10 bg-pink-500 rounded-full cursor-pointer'></div>
            <div onClick={() => setColor("bg-neutral-500")} className='w-8 md:w-10 h-8 md:h-10 bg-neutral-500 rounded-full cursor-pointer'></div>
            <div onClick={() => setColor("bg-lime-500")} className='w-8 md:w-10 h-8 md:h-10 bg-lime-500 rounded-full cursor-pointer'></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;