import Header from "../components/Header"
import GridContainer from "../components/GridContainer"
import LoginLightbox from "../components/LoginLightbox";
import { useState } from "react";
import './styles/Dashboard.css'
import linieorizontala from './../assets/linie-orizontala.svg';
import Warranties from "../components/Warranties";

interface DashProps {
    isLoggedIn?: boolean
}

const Dashboard = ({ isLoggedIn }: DashProps) => {

    const handleSortSelection = (option: any) => {
    };
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
    };
    const toggleSortDropdown = () => {
        setIsSortOpen(!isSortOpen);
    };
    return (
        <>
            {!isLoggedIn && <LoginLightbox />}
            <GridContainer />
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <svg className="search-icon" aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7">
                    <title id="title">Search Icon</title>
                    <desc id="desc">A magnifying glass icon.</desc>
                    <g className="search-path" fill="none" stroke="black">
                        <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
                        <circle cx="8" cy="8" r="7" />
                    </g>
                </svg>
            </div>
            <div className="filters-container">
                <div className='sort'>
                    <button className="sort-button" onClick={toggleSortDropdown}>
                        <p>Sort</p>
                        <svg className="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="39" height="18" viewBox="0 0 39 18" fill="none">
                            <line y1="-1.5" x2="24.6981" y2="-1.5" transform="matrix(-0.761791 -0.647822 0.761791 -0.647823 21.7222 16)" stroke="black" strokeWidth="3" />
                            <line y1="-1.5" x2="24.6981" y2="-1.5" transform="matrix(0.761791 -0.647823 -0.761791 -0.647822 17.0186 16)" stroke="black" strokeWidth="3" />
                        </svg>
                    </button>

                    {isSortOpen && (
                        <div className="dropdown sort">
                            <p onClick={() => handleSortSelection('Expiration Date')}>Expiration Date</p>
                            <img className="linieoriz" src={linieorizontala}></img>
                            <p onClick={() => handleSortSelection('Expiration Date')}>Expiration Date</p>
                            <img className="linieoriz" src={linieorizontala}></img>
                            <p onClick={() => handleSortSelection('Upcoming Expiration')}>Upcoming Expiration</p>
                            <img className="linieoriz" src={linieorizontala}></img>
                            <p onClick={() => handleSortSelection('Upcoming Expiration')}>Upcoming Expiration</p>
                            <img className="linieoriz" src={linieorizontala}></img>
                            <p onClick={() => handleSortSelection('Name')}>Name</p>
                        </div>
                    )}
                </div>
            </div>
                <Warranties></Warranties>
        </>
    )
}
export default Dashboard