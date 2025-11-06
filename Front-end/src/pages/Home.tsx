import './styles/Home.css'
import info from '../assets/info.png'
import dash from '../assets/dashboard.png'
import Footer from "../components/Footer"
import HomeBenefits from "../components/HomeBenefits"
import conf2 from '../assets/conf2.png'
import { Link } from "react-router-dom"

function Home() {
    return (
        <>
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
                    <h2>Advanced reports and easy <br></br> to use dashboard</h2>
                    <p>Simplify decision-making with data-driven insights</p>
                    <p>Retain important details of a warranty</p>
                    <p>Reduce 80% of your work</p>
                </div>
            </div>
            <div className="main-content">
                <div className="text second second-2">
                    <h2>Get rid of stress with push <br></br>reminders</h2>
                    <p>Breathe easy with automated expiry alerts</p>
                    <p>Never worry again about the expiration date</p>
                    <p>Automation handles the heavy lifting for you</p>
                </div>
                <div className="image-2">
                    <img src={conf2} />
                </div>
            </div>
            <div className="p5"></div>
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
                <Link to="/pricing" className='home-try button buttoninvert'>Learn more</Link>
                </div>
            </div>
            <HomeBenefits />
            
            <Footer />
        </>
    )
}
export default Home