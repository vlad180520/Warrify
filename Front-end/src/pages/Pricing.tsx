import Header from "../components/Header"
import './styles/Pricing.css'
import PricingColumns from "../components/PricingColumns"
import Footer from "../components/Footer"
import PriceCalculator from "../components/PriceCalculator"

function Pricing() {
    return (
        <>
            <Header />
            <div className="mainPricing">
                <div className="title">
                    Alegeti abonamentul potrivit pentru Dvs.
                </div>
                <PricingColumns />
                <PriceCalculator />
            </div>
            <Footer />
        </>
    )
}
export default Pricing