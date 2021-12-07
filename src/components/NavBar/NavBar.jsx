import React from 'react'
import {NavLink} from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
    return (
        <nav className="nav-bar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="movie-player">movie player</NavLink>
            <NavLink to="quotes-list">list</NavLink>
        </nav>
    )
}
