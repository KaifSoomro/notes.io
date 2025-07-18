import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterComp = ({ showRegister, setRegisterBoolean, setLoginBoolean }) => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = {
      name:name,
      email:email,
      password:password
    }

    axios.post(`${import.meta.env.VITE_SERVER_URL}/user/registration`, userData).then((response) => {
      console.log(response);
      setRegisterBoolean(false);
      toast.success("Registration Successful.");
      setLoginBoolean(true)
    }).catch((error) => {
      console.log(error)
      toast.warning("Registration Failed.");
    })

  }

  const alreadyHaveAccount = () => {
    setRegisterBoolean(false);
    setLoginBoolean(true)
  }

  return (
    <div className={`w-full h-screen bg-neutral-900/80 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 flex items-center justify-center ${showRegister} px-3`}>
      <form onSubmit={handleRegister} className='w-[430px] md:w-[550px] h-[380px] md:h-[420px] bg-white rounded-md pt-5 relative text-neutral-950 text-center'>
        <button onClick={()=>setRegisterBoolean(false)} type="button" className='absolute top-5 right-5 text-3xl cursor-pointer text-neutral-900'>
          <IoClose />
        </button>

        <h1 className='text-2xl md:text-3xl my-1 md:my-2 font-semibold'>Registration</h1>

        <input
          type="text"
          placeholder='Username'
          onChange={(e)=>setName(e.target.value)}
          className='w-[85%] h-10 my-4 md:my-5 py-4 border-b border-b-black text-neutral-950 outline-none ps-1 pe-7 pt-2 text-xl md:text-2xl bg-transparent'
        />
        <input
          type="email"
          placeholder='Email'
          onChange={(e)=>setEmail(e.target.value)}
          className='w-[85%] h-10 my-4 md:my-5 py-4 border-b border-b-black text-neutral-950 outline-none ps-1 pe-7 pt-2 text-xl md:text-2xl bg-transparent'
        />
        <input
          type="text"
          placeholder='Password'
          onChange={(e)=>setPassword(e.target.value)}
          className='w-[85%] h-10 my-4 md:my-5 py-4 border-b border-b-black text-neutral-950 outline-none ps-1 pe-7 pt-2 text-xl md:text-2xl bg-transparent'
        />
        
        <div className='w-full flex items-center justify-center mt-3'>
            <button
              type='submit'
              className='w-full px-4 py-1 md:px-5 md:py-2 bg-blue-900 mx-9 text-white rounded cursor-pointer'
            >
              Register
            </button>
        </div>
        <p className='mt-3'>Already have an account? <span onClick={alreadyHaveAccount} className='text-blue-500 cursor-pointer'>Login</span></p>
      </form>
    </div>
  );
};

export default RegisterComp;