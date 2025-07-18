import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { fetchNotes } from "../features/notes/notesSlice.js";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const LoginComp = ({ showLogin, setLoginBoolean, setRegisterBoolean }) => {

  const dispatch = useDispatch();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    const loginData = {
      email:email,
      password:password
    }

    axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`, loginData).then((response) => {
      console.log(response.data);
      localStorage.setItem("token", response?.data?.token);
      dispatch(fetchNotes(email));
      toast.success("Login Successful.")
      setLoginBoolean(false);
    }).catch((err)=>{
      console.log(err)
      toast.warning("Login Failed.")
    })    
  }

  const dontHaveAccount = () => {
    setRegisterBoolean(true);
    setLoginBoolean(false);
  }

  return (
    <div className={`w-full h-screen bg-neutral-900/80 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 flex items-center justify-center ${showLogin} px-3`}>
      <form onSubmit={handleLoginSubmit} className='w-[430px] md:w-[550px] h-[300px] md:h-[400px] bg-white rounded-md pt-5 relative text-neutral-950 text-center'>
        <button onClick={()=>setLoginBoolean(false)} type="button" className='absolute top-5 right-5 text-3xl cursor-pointer text-neutral-900'>
          <IoClose />
        </button>

        <h1 className='text-2xl md:text-3xl my-1 md:my-3 font-semibold'>Login</h1>

        <input
          type="email"
          placeholder='Email'
          onChange={(e)=>setEmail(e.target.value)}
          className='w-[85%] h-10 my-4 md:my-5 py-4 border-b border-b-black text-neutral-950 outline-none ps-1 pe-7 pt-2 text-xl md:text-2xl bg-transparent'
        />
        <input
          type="password"
          placeholder='Password'
           onChange={(e)=>setPassword(e.target.value)}
          className='w-[85%] h-10 my-4 md:my-5 py-4 border-b border-b-black text-neutral-950 outline-none ps-1 pe-7 pt-2 text-xl md:text-2xl bg-transparent'
        />
        
        <div className='w-full flex items-center justify-center mt-3'>
            <button
              type='submit'
              className='w-full px-4 py-1 md:px-5 md:py-2 bg-blue-900 mx-9 text-white rounded cursor-pointer'
            >
              Login
            </button>
        </div>
        <p className='mt-3'>Don't have an account? <span onClick={dontHaveAccount} className='text-blue-500 cursor-pointer'>Create Account</span></p>
      </form>
    </div>
  );
};

export default LoginComp;