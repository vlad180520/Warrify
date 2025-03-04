import Header from "../components/Header"
import './styles/Pricing.css'
import PricingColumns from "../components/PricingColumns"
function Pricing() {
    return (
        <>
        <Header />
        <div className="mainPricing">
            <div className="title">
                Alegeti abonamentul potrivit pentru Dvs.
            </div>
            <PricingColumns />
        </div>
        </>
    )
}
export default Pricing