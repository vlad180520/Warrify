
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import React from 'react';
import './Header.css'

function Header() {
    return (
        <>
            <div className="header">
                <div className="leftSide">
                    <img src="" alt="logo"></img>
                    <ul className='textSectiuni'>
                        <li><Link to="/about" className='textSectiuni'>About</Link></li>
                        <li><Link to="/dashboard" className='textSectiuni'>Dashboard</Link></li>
                        <li><Link to="/pricing" className='textSectiuni'>Pricing</Link></li>
                        <li><Link to="/contact" className='textSectiuni'>Contact</Link></li>
                    </ul>
                </div>
                <div className="rightSide">
                    <ul className='textSectiuni'>
                        <li>
                            <Link to="/home" className='button'>Premium</Link>
                        </li>
                        <li><Link to="/profile" className='button'>Profile</Link></li>
                        <li>
                            <Link to="/register" className='button'>Register</Link>
                        </li>
                        <li><Link to="/login" className='button'>Login</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Header