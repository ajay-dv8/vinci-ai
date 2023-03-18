import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost } from './pages';
import './pages/bg.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <header className='sticky top-0 h-15 background-animate bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 w-full flex justify-between items-center bg-[#C25188] sm:px-8 py-4 border-b border-b-[#e6ebf4] opacity-100 z_idx_h'>
          <Link to='/'>
            <img src={logo} alt="logo" className="w-10 mx-4 object-contain" />
          </Link>

          <Link to='/create-post'
            className='shadow-md font-inter font-medium bg-blue-600 text-white px-2 py-1 mx-3 rounded-md hover:bg-blue-800'>
            Generate
          </Link>
        </header>

        <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>

          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/create-post' element={<CreatePost />}/>
          </Routes>

        </main>
      </BrowserRouter>
    </>
  )
}

export default App;