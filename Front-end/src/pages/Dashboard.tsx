import Header from "../components/Header";
import GridContainer from "../components/GridContainer";
import LoginLightbox from "../components/LoginLightbox";
import { useState } from "react";
import "./styles/Dashboard.css";
import linieorizontala from "./../assets/linie-orizontala.svg";
import Warranties from "../components/Warranties";

interface DashProps {
  isLoggedIn?: boolean;
}

interface Warranty {
  prdName: string;
  dataExp: string;
  dataCump: string;
  comp: string;
}

const Dashboard = ({ isLoggedIn }: DashProps) => {
  const [warranties, setWarranties] = useState<Warranty[]>([
    {
      prdName: "MacBook Pro M3",
      dataExp: "18.05.2027",
      dataCump: "16.12.2023",
      comp: "Istyle",
    },
    {
      prdName: "Asus ROG Zephyrus",
      dataExp: "29.03.2028",
      dataCump: "16.12.2024",
      comp: "Altex",
    },
    {
      prdName: "Acer Nitro 5",
      dataExp: "28.02.2026",
      dataCump: "16.12.2023",
      comp: "Emag",
    },
  ]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split(".");
    return new Date(`${year}-${month}-${day}`);
  };

  const handleSortSelection = (option: string) => {
    const sorted = [...warranties];
    const today = new Date();

    switch (option) {
      case "Expiration Date (Asc)":
        sorted.sort(
          (a, b) => parseDate(a.dataExp).getTime() - parseDate(b.dataExp).getTime()
        );
        break;
      case "Expiration Date (Desc)":
        sorted.sort(
          (a, b) => parseDate(b.dataExp).getTime() - parseDate(a.dataExp).getTime()
        );
        break;
      case "Upcoming Expiration (Asc)":
        sorted.sort((a, b) => {
          const aDiff = parseDate(a.dataExp).getTime() - today.getTime();
          const bDiff = parseDate(b.dataExp).getTime() - today.getTime();
          return aDiff - bDiff;
        });
        break;
      case "Upcoming Expiration (Desc)":
        sorted.sort((a, b) => {
          const aDiff = parseDate(a.dataExp).getTime() - today.getTime();
          const bDiff = parseDate(b.dataExp).getTime() - today.getTime();
          return bDiff - aDiff;
        });
        break;
      case "Name (A-Z)":
        sorted.sort((a, b) => a.prdName.localeCompare(b.prdName));
        break;
      case "Name (Z-A)":
        sorted.sort((a, b) => b.prdName.localeCompare(a.prdName));
        break;
      default:
        break;
    }
    setWarranties(sorted);
  };

  const toggleSortDropdown = () => setIsSortOpen(!isSortOpen);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setSearchQuery(e.target.value);

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
        <svg
          className="search-icon"
          aria-labelledby="title desc"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19.9 19.7"
        >
          <title id="title">Search Icon</title>
          <desc id="desc">A magnifying glass icon.</desc>
          <g className="search-path" fill="none" stroke="black">
            <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
            <circle cx="8" cy="8" r="7" />
          </g>
        </svg>
      </div>

      <div className="filters-container">
        <div className="sort">
          <button className="sort-button" onClick={toggleSortDropdown}>
            <p>Sort</p>
            <svg
              className="dropdown-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="18"
              viewBox="0 0 39 18"
              fill="none"
            >
              <line
                y1="-1.5"
                x2="24.6981"
                y2="-1.5"
                transform="matrix(-0.761791 -0.647822 0.761791 -0.647823 21.7222 16)"
                stroke="black"
                strokeWidth="3"
              />
              <line
                y1="-1.5"
                x2="24.6981"
                y2="-1.5"
                transform="matrix(0.761791 -0.647823 -0.761791 -0.647822 17.0186 16)"
                stroke="black"
                strokeWidth="3"
              />
            </svg>
          </button>

          {isSortOpen && (
            <div className="dropdown sort">
              <p onClick={() => handleSortSelection("Expiration Date (Asc)")}>
                Expiration Date (Asc)
              </p>
              <img className="linieoriz" src={linieorizontala} alt="divider" />
              <p onClick={() => handleSortSelection("Expiration Date (Desc)")}>
                Expiration Date (Desc)
              </p>
              <img className="linieoriz" src={linieorizontala} alt="divider" />
              <p onClick={() => handleSortSelection("Upcoming Expiration (Asc)")}>
                Upcoming Expiration (Asc)
              </p>
              <img className="linieoriz" src={linieorizontala} alt="divider" />
              <p onClick={() => handleSortSelection("Upcoming Expiration (Desc)")}>
                Upcoming Expiration (Desc)
              </p>
              <img className="linieoriz" src={linieorizontala} alt="divider" />
              <p onClick={() => handleSortSelection("Name (A-Z)")}>Name (A-Z)</p>
              <img className="linieoriz" src={linieorizontala} alt="divider" />
              <p onClick={() => handleSortSelection("Name (Z-A)")}>Name (Z-A)</p>
            </div>
          )}
        </div>
      </div>

      <Warranties warranties={warranties} />
    </>
  );
};

export default Dashboard;