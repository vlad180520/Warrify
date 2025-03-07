import Header from "../components/Header"
import './styles/Pricing.css'
import PricingColumns from "../components/PricingColumns"
import Footer from "../components/Footer"
import PriceCalculator from "../components/PriceCalculator"
import { Link } from "react-router-dom"

function Pricing() {
    return (
        <>
            <div className="mainPricing">
                <div className="title">
                    Pick the subscription that suits you best
                </div>
                <PricingColumns />
                <div className="free">
                    <div className="stanga-free">
                        <h2>Get started with our free subscription</h2>
                        <ul className="ul-free">
                            <li className="li-free">
                                Management offers 20 monthly guarantees
                            </li>
                            <li className="li-free">
                                Manually import guarantees from email
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