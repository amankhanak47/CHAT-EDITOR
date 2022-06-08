import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './home.css'


let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value;
     document.getElementById('joinInput').value=""
    
}


const Home = () => {

    const [name, setName] = useState('')

  return (
    <div className='home'>
      <div className="homebox">

      <img className='h-img' src="https://shardings.com/resources/img/logo-3.svg" alt="" />
          <input onChange={(e)=>setName(e.target.value)} className="input" placeholder='Enter Your Name' id='joinInput' type="text" />
          <Link  onClick={(e)=>!name? e.preventDefault():null} to={'/chat'}><button className='btn' onClick={sendUser} >Join</button></Link>
      </div>
    </div>
  )
}

export default Home;
export {user}
