
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import React from 'react';
import './Header.css'

function Header() {
    return (
        <>
            <div className="header">
                <div className="leftSide">
                    <ul className='textSectiuni'>
                        <li><Link to="/about" className='textSectiuni'>About</Link></li>
                        <li><Link to="/dashboard" className='textSectiuni'>Dashboard</Link></li>
                        <li><Link to="/pricing" className='textSectiuni'>Pricing</Link></li>
                        <li><Link to="/contact" className='textSectiuni'>Contact</Link></li>
                    </ul>
                </div>
                <div className="rightSide">
                    <ul className='textSectiuni'>
                        <li>Profile</li>
                        <li>
                            Register
                        </li>
                        <li>Login</li>
                        <li>
                            <img src="" alt="statusPachet" />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Header