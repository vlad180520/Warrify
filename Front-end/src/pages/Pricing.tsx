import Header from "../components/Header"
import './styles/Pricing.css'
import PricingColumns from "../components/PricingColumns"
import Footer from "../components/Footer"
import PriceCalculator from "../components/PriceCalculator"
import { Link } from "react-router-dom"

function Pricing() {
    return (
        <>
            <Header />
            <div className="mainPricing">
                <div className="title">
                    Alegeti abonamentul potrivit pentru Dvs.
                </div>
                <PricingColumns />
                <div className="free">
                    <div className="stanga-free">
                        <h2>Incepeti cu abonamentul nostru gratuit</h2>
                        <ul className="ul-free">
                            <li className="li-free">
                                Gestionare 20 garantii lunar
                            </li>
                            <li className="li-free">
                                Importare manuala a garantiilor din email
                            </li>
                        </ul>
                    </div>
                    <div className="dreapta-free">
                        <p className="big-free">0 RON</p>

                        <Link to="/register" className='free-try button buttoninvert'>Try for free</Link>
                    </div>
                </div>
                <PriceCalculator />
            </div>
            <Footer />
        </>
    )
}
export default Pricing