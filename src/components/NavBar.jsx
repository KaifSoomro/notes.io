import React, { useEffect, useState } from 'react';
import { HiMiniMagnifyingGlass, HiMiniBars3 } from "react-icons/hi2";
import { FaCirclePlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import RegisterComp from './RegisterComp';
import LoginComp from './LoginComp';
import { toast } from 'react-toastify';

const Navbar = ({ onAddClick, onSearchClick, onMenuClick, setSearchQuery }) => {

  // Register
  const [ registerBoolean, setRegisterBoolean ] = useState(false);
  const showRegister = registerBoolean ? "block" : "hidden";

  // Login
  const [ loginBoolean, setLoginBoolean ] = useState(false);
  const showLogin = loginBoolean ? "block" : "hidden";

  const [profileBox,setProfileBox] = useState(false);
  const showProfileBox = profileBox ? "absolute" : "hidden";

  // token login funtion

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  let nameLetter;

  if(userName){
    nameLetter = userName.slice(0,1);
  }

  useEffect(() => {
    if(!token){
      setRegisterBoolean(true)
    }
  },[])

  const handleDeleteUser = () => {
      if(token){
        localStorage.removeItem("token");
      }
      if(userName){
        localStorage.removeItem("username");
      }
      if(email){
        localStorage.removeItem("email");
      }

      toast.info("Logged out successfully.");
      window.location.reload();
  }

  return (
    <>
      <nav className='w-full h-24 md:h-40 flex items-center justify-between md:px-60 px-10 text-white'>
      <div className='flex items-center justify-center md:gap-10 gap-2'>
        {/* App Title */}
        <h1 className='text-[35px] md:text-6xl text-blue-400 font-semibold'>notes.io</h1>
        {/* Desktop Add Button */}
        <FaCirclePlus onClick={onAddClick} className='hidden md:block text-5xl text-neutral-400 cursor-pointer hover:text-white' />
      </div>
      <div className='flex items-center justify-center gap-3'>

        {/* Profile */}
        <button
          type='button' 
          onClick={()=>setProfileBox(true)}
          className='w-10 h-10 bg-blue-400 text-blue-700 flex items-center justify-center rounded-full cursor-pointer'>
            <p className='uppercase text-2xl'>{ nameLetter ? nameLetter : <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" className='w-8' alt="user-img" /> }</p>
        </button>
        {/* Profile Box */}
        <div className={`z-10 w-[150px] h-[180px] md:w-[200px] md:h-[230px] top-20 right-25 md:top-30 md:right-120 bg-neutral-800 ${showProfileBox} rounded-md shadow-md`}>
          <button onClick={()=>setProfileBox(false)} type='button' className='absolute top-3 right-3 text-2xl md:text-3xl cursor-pointer'>
            <IoClose />
          </button>

          <ul className='p-5 md:p-10 pt-5 md:pt-10'>
            <li onClick={()=>console.log(token)} className='text-lg md:text-xl my-2 md:my-3'>Edit Profile</li>
            <li onClick={()=>setRegisterBoolean(true)} className='text-lg md:text-xl my-2 md:my-3 cursor-pointer'>Registration</li>
            <li onClick={()=>setLoginBoolean(true)} className='text-lg md:text-xl my-2 md:my-3 cursor-pointer'>Login</li>
            <button onClick={handleDeleteUser} className='text-lg md:text-xl text-red-500'>Log out</button>
          </ul>
        </div>
        {/* Mobile Search Icon */}
        <HiMiniMagnifyingGlass onClick={onSearchClick} className='bg-neutral-800 p-2 rounded-xl block md:hidden text-[45px] cursor-pointer text-neutral-400 hover:text-white' />
        {/* Desktop Search Input */}
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder='Search'
          className='hidden md:block border-none outline-none text-lg text-white px-4 py-2 rounded-md bg-neutral-800' 
        />
      </div>
    </nav>
    <RegisterComp showRegister={showRegister} setRegisterBoolean={setRegisterBoolean} setLoginBoolean={setLoginBoolean}/>
    <LoginComp showLogin={showLogin} setLoginBoolean={setLoginBoolean} setRegisterBoolean={setRegisterBoolean}/>
    </>
  );
};

export default Navbar;