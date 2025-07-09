import React from 'react'

const Welcome = () => {
  return (
    <div className='w-full h-[50vh] md:h-[60%] flex items-center justify-center flex-col text-center'>
        <h1 className='text-[9vw] md:text-6xl leading-10 md:leading-0 font-semibold md:mb-7'>Welcome to <span className='text-blue-400'>notes.io</span></h1>
        <p className='text-[3.9vw] md:text-[23px] text-gray-300'>The Ultimate Hub for Your Ideas and Plans.</p>
    </div>
  )
}

export default Welcome