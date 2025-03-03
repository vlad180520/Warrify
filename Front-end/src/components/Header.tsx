
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import React from 'react';
import './Header.css'

function Header() {
    return (
        <>
            <div className="header">
                <div className="leftSide">
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="rightSide">
                    <ul>
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