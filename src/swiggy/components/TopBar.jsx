import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <section className="topbar">
        <div className="companytitle">
          <Link to='/' className='link'><h2>SWIGGY</h2></Link>
            
        </div>
        <div className="searchbar">
            <input type='text' placeholder='search...'/>
        </div>
        <div className="userauth">
            Login/SignUp
        </div>
    </section>

  )
}

export default TopBar