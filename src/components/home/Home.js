import React from 'react'
import Login from './login'
import './home.css'
import athlete from './home_nude_cartoon.png'
import { Button } from 'antd';
import { Link } from 'react-router-dom';
const Home = () => {
    const demoStart= () =>{
        
    }
  return (
   <section className='container'>
    <div className='child parent-child'>
        <h2>
            Let's make you healthy!
        </h2>
        <Button type="primary" onClick={demoStart}><Link to='/demo'>Start Demo</Link></Button>
    </div>
    <div className='child'>
        <img src={athlete} alt="athlete"  width="550" height="750"></img>
    </div>
    <div className='child'>
        <Login/>
    </div>
   </section>
  )
}

export default Home