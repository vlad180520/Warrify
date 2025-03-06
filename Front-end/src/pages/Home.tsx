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
                    Make your business <br /> grow with Warrify
                </div>
                <div className="dezvolta-2">
                Bring your team together online with Warrify.
                Warrify is an online tool that can help you grow 
                your business and team, whether you're a freelancer, 
                a startup, or a business. Stores and safeguards guarantees, 
                and transforms how your teams collaborate.
                <Link to="/register" className='home-try button buttoninvert'>Try for free</Link>
                </div>
            </div>
            <HomeBenefits />
            
            <Footer />
        </>
    )
}
export default Home