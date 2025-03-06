// PricingColumns.tsx
import "./PricingColumns.css";

const plans = [
  {
    title: "Enterprise",
    price: "15 RON",
    garantii: "Gestionare 80 garantii lunar",
    av1: "Organizare garantii pe categorii",
    av2: "Preluare perioadica a garantiilor din mail",
    f1: "Destinat utilizatorilor individuali",

    popular: false
  },
  {
    title: "Pro",
    price: "35 RON",
    garantii: "Gestionare 250 garantii lunar",
    av1: "Notificari push extra pentru expirarea garantiilor",
    av2: "Raport de baza al garantiilor",
    f1: "Destinat intreprinderilor mici-medii",
    popular: true
  },
  {
    title: "Premium",
    price: "70 RON",
    garantii: "Gestionare 1000+ garantii lunar",
    av1: "Raport avansat al garantiilor",
    av2: "Suport 24/7",
    f1: "Destinat intreprinderilor mari",
    popular: false
  }
];

const PricingColumns = () => {
  return (
    <div className="pricing-container">
      {plans.map((plan, index) => (
        <div key={index} className="pricing-column">
          {plan.popular && <div className="popular-badge">Cel mai popular</div>}
          <h2>{plan.title}</h2>
          <div className="price-box">
            {plan.price!='0 RON'&&
            <>
            <div className="price">{plan.price}</div>
            <small>*RON pe luna</small>
            </>
            }
            {plan.price=='0 RON'&&
            <><div className="price">Gratis</div>
            <br></br>
            </>
            }
          </div>
          
          <div className="specs">
            <p>{plan.garantii}</p>
            <p>{plan.av1}</p>
            <p>{plan.av2}</p>
          </div>

          <ul className="features">
            <li>{plan.f1}</li>
          </ul>

          <button className="buy-button">Cumpără {plan.title}</button>
        </div>
      ))}
    </div>
  );
};

export default PricingColumns;