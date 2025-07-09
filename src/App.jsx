import React from 'react'
import Dashboard from './components/Dashboard';
 import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <>
      <Dashboard />
      <ToastContainer />
    </>
  )
}

export default App