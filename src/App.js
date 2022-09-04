import React from 'react'
import Header from './components/header/Header'
import Home from './components/home/Home'
import Demo from './components/home/Demo'
import { BrowserRouter, Route,Switch, Routes } from 'react-router-dom'
const App = () => {
  return (
    <>
    <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/demo' element={<Demo/>}/>
   </Routes>
   </>
  )
}

export default App