import React from 'react';
import { IoClose } from "react-icons/io5";

const Sidebar = ({ isOpen, onClose }) => {

  const showSideBarClass = isOpen ? "left-0" : "left-[-100%]";
  const userName = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  let nameLetter;
  let name;
  let userEmail;

  if(userName){
    nameLetter = userName.slice(0,1);
    name = userName;
  }

  if(email){
    userEmail = email;
  }

  return (
    <div className={`fixed top-0 w-[80%] h-[100%] p-10 transition-all bg-neutral-800 z-10 ${showSideBarClass} text-white`}>
      {/* Close button */}
      <button onClick={onClose} type='button' className='absolute top-5 right-5 text-3xl'>
        <IoClose />
      </button>

  
      <div className='w-full flex items-center justify-start gap-5 mt-10'>
        <div className='w-20 h-20 rounded-full bg-blue-400 flex items-center justify-center'>
          <p className='uppercase text-blue-700  text-5xl'>{ nameLetter ? nameLetter : <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" className='w-13' alt="user-img" /> }</p>
        </div>
        <div>
          <h1 className='text-xl tracking-wide capitalize'>{ name ? name : "John doe" }</h1>
          <h1 className='text-xs text-neutral-300'>{ userEmail ? userEmail : "xyz@gmail.com" }</h1>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;