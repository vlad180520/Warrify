
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import React from 'react';
import './Header.css'
import Logo from '../assets/Logo'

const isLoggedIn = false
function Header() {
    return (
        <>
            <div className="header">
                <div className="leftSide">
                    <Link to="/home"><Logo/></Link>
                    <ul className='textSectiuni'>
                    <Link to="/home" className='textSectiuni'><li className='listSectiuni'>Home</li></Link>
                    <Link to="/dashboard" className='textSectiuni'><li className='listSectiuni'>Dashboard</li></Link>
                    <Link to="/pricing" className='textSectiuni'><li className='listSectiuni'>Pricing</li></Link>
                    <Link to="/about" className='textSectiuni'><li className='listSectiuni'>About Us</li></Link>
                    <Link to="/contact" className='textSectiuni'><li className='listSectiuni'>Contact</li></Link>
                    </ul>
                </div>
                <div className="rightSide">
                    <ul className='textSectiuni'>
                        {isLoggedIn && <>
                            <li>
                                <Link to="/home" className='button buttoninvert'>Premium</Link>
                            </li>
                            <li>
                                <Link to="/profile" className='button'>Profile</Link>
                            </li>
                        </>
                        }
                        {!isLoggedIn &&
                            <>
                                <li>
                                    <Link to="/register" className='button buttoninvert'>Try for free</Link>
                                </li>
                                <li>
                                    <Link to="/login" className='button'>Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className='button'>Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Header