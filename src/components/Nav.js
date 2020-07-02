import React from 'react'
import { NavLink } from 'react-router-dom'
import '../index.css'

export default function Nav() {
    return (
        <nav className='nav stroke'>
            <ul>
                <li>
                    <NavLink to='/' exact className="nav-item" activeClassName='active'>
                        Home
                    </NavLink>

                </li>
                <li>
                    <NavLink to='/NewPoll' className="nav-item" activeClassName='active'>
                        New Poll
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/LeaderBoard' className="nav-item" activeClassName='active'>
                        LeaderBoard
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}