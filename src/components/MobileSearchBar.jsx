import React from 'react';
import { IoClose } from "react-icons/io5";

const MobileSearchBar = ({ isOpen, onClose, setSearchQuery }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='w-full h-15 bg-neutral-800 flex items-center justify-center px-10 text-white'>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder='Search'
        className='w-full border-none outline-none text-lg text-white px-4 py-2 rounded-md' // Full width for mobile
      />
      <button onClick={onClose} type='button' className='text-3xl text-white ml-3'>
        <IoClose />
      </button>
    </div>
  );
};

export default MobileSearchBar;