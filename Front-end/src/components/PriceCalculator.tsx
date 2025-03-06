import { useState } from 'react';
import './PriceCalculator.css';

const PRICE_PER_TB = 0.20;

const PriceCalculator = () => {
  const [storage, setStorage] = useState<number>(100);

  const calculatePrice = () => {
    return storage * PRICE_PER_TB;
  };

  return (
    <>
      <h2 className='titlu-price'>Obține spațiu de stocare flexibil și plătește în funcție de utilizare</h2>
      <div className='container-price'>
      <div className="pricing-column">
          <h2>FlexiPro</h2>
          <div className="price-box">
            <>
            <div className="incepand">Incepand de la</div>
            <div className="price">50 RON</div>
            <small>*RON pe luna</small>
            </>
          </div>
          
          <div className="specs">
            <p>Gestionare 350 garantiii lunar de baza</p>
            <p>Numar garantii suplimentar taxat cu 0.20 RON* pe garantie</p>
            <p>Raport avansat al garantiilor</p>
          </div>

          <ul className="features">
            <li>Permite flexibilitate</li>
          </ul>

          <button className="buy-button">Cumpără FlexiPro</button>
        </div>
        <div className="price-calculator">
          <h2>Calculator Preț Estimativ</h2>

          <div className="calculator-section">
            <label>
              Stocare: {storage}
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
            <h3>Estimare lunară totală</h3>
            <div className="price-display">
              {calculatePrice().toFixed(2)} RON
            </div>
            <small className="price-note">*preț calculat pentru {storage} garantii</small>
          </div>
        </div>
      </div>

    </>

  );
};

export default PriceCalculator;