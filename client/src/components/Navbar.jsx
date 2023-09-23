import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='navbar-top'>
            <h1 className='project-title'>DSA Handbook</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to='problems/addproblem'>Create</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar