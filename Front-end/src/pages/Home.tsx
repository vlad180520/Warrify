import Header from "../components/Header"
import './styles/Home.css'
import info from '../assets/info.png'
import dash from '../assets/dashboard.png'
import Footer from "../components/Footer"
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
                <div className="main-content mtop">
                    <div className="image">
                        <img src={dash} />
                    </div>
                <div className="text second">
                    <h2>Advanced reports and easy to use dashboard</h2>
                    <p>Reduces 80% of work</p>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Home