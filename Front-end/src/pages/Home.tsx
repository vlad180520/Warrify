import Header from "../components/Header"
import './styles/Home.css'
import info from '../assets/info.png'
import dash from '../assets/dashboard.png'
import Footer from "../components/Footer"
import HomeBenefits from "../components/HomeBenefits"
import logo from '../assets/logo.png'
import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            <Header />
            <div className="background">
                <div className="main-content">
                    <div className="text">
                        <h2>Warrify makes organizing <br></br>invoices easy</h2>
                        <p>A new way of managing warranties</p>
                        <p>Efficient. Organized. Simple</p>
                    </div>
                    <div className="image">
                        <img src={info} />
                    </div>
                </div>
            </div>
            <div className="main-content mtop">
                <div className="image">
                    <img src={dash} />
                </div>
                <div className="text second">
                    <h2>Advanced reports and easy to use dashboard</h2>
                    <p>Reduces 80% of work</p>
                </div>
            </div>
            <div className="main-content">
                <div className="text second">
                    <h2>Warrify makes organizing <br></br>invoices easy</h2>
                    <p>A new way of managing warranties</p>
                    <p>Efficient. Organized. Simple</p>
                </div>
                <div className="image">
                    <img src={info} />
                </div>
            </div>
            <div className="dezvolta">
                <div className="dezvolta-1">
                    Dezvoltă-ți<br></br> businessul cu Warrify
                </div>
                <div className="dezvolta-2">
                Adună-ți echipa online cu Warrify.
                De la liber profesioniști la startupuri și până la întreprinderi, Warrify este instrumentul online
                 perfect pentru a te ajuta să îți dezvolți businessul și echipa. Stochează și protejează garantiile
                  și transformă cu Warrify modul în care echipele tale colaborează.
                <Link to="/register" className='home-try button buttoninvert'>Try for free</Link>
                </div>
            </div>
            <HomeBenefits />
            
            <Footer />
        </>
    )
}
export default Home