import { useState } from 'react'
import './PriceCalculator.css'

const PRICE_PER_TB = 0.30;

const PriceCalculator = () => {
  const [storage, setStorage] = useState<number>(100);

  const calculatePrice = () => {
    return storage * PRICE_PER_TB;
  };

  return (
    <>
      <h2 className='titlu-price'>Obtain customizable storage space and pay based on usage</h2>
      <div className='container-price'>
      <div className="pricing-column">
          <h2>FlexiPro</h2>
          <div className="price-box">
            <>
            <div className="incepand">Starting at</div>
            <div className="price">50 RON</div>
            <small>*RON per month</small>
            </>
          </div>
          
          <div className="specs">
            <p>Management offers 300 monthly guarantees</p>
            <p>Number of additional guarantees charged with 0.30 RON* per warranty.</p>
            <p>Advanced warranty report</p>
          </div>

          <ul className="features">
            <li>Allows flexibility</li>
          </ul>

          <button className="buy-button">Buy FlexiPro</button>
        </div>
        <div className="price-calculator">
          <h2>Estimated Price Calculator</h2>

          <div className="calculator-section">
            <label>
              Number of warranties: {storage}
              <input
                type="range"
                min="3"
                max="5000"
                step="1"
                value={storage}
                onChange={(e) => setStorage(Number(e.target.value))}
                className="storage-slider"
              />
            </label>
          </div>

          <div className="price-result">
            <h3>Total monthly estimate</h3>
            <div className="price-display">
              {calculatePrice().toFixed(2)} RON
            </div>
            <small className="price-note">*price calculated for {storage} warranties</small>
          </div>
        </div>
      </div>

    </>

  );
};

export default PriceCalculator