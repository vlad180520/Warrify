
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
                    <Logo/>
                    <ul className='textSectiuni'>
                        <li className='listSectiuni'><Link to="/home" className='textSectiuni'>Home</Link></li>
                        <li className='listSectiuni'><Link to="/dashboard" className='textSectiuni'>Dashboard</Link></li>
                        <li className='listSectiuni'><Link to="/pricing" className='textSectiuni'>Pricing</Link></li>
                        <li className='listSectiuni'><Link to="/about" className='textSectiuni'>About Us</Link></li>
                        <li className='listSectiuni'><Link to="/contact" className='textSectiuni'>Contact</Link></li>
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
                                    <Link to="/freetrial" className='button buttoninvert'>Try for free</Link>
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