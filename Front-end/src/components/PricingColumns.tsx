// PricingColumns.tsx
import "./PricingColumns.css";

const plans = [
  {
    title: "Enterprise",
    price: "200 RON",
    garantii: "Management offers 120 yearly guarantees",
    av1: "Grouping guarantees into categories",
    av2: "Guarantees are collected from mail periodically",
    f1: "For individual users",

    popular: false
  },
  {
    title: "Pro",
    price: "300 RON",
    garantii: "Management offers 250 yearly guarantees",
    av1: "Extra push notifications will be sent when the guarantees expire.",
    av2: "Basic report on warranties.",
    f1: "Intended for small-medium enterprises",
    popular: true
  },
  {
    title: "Premium",
    price: "500 RON",
    garantii: "Management offers 500+ yearly guarantees",
    av1: "Advanced report on warranties",
    av2: "24/7 support",
    f1: "Intended for bigger enterprises",
    popular: false
  }
];

const PricingColumns = () => {
  return (
    <div className="pricing-container">
      {plans.map((plan, index) => (
        <div key={index} className="pricing-column">
          {plan.popular && <div className="popular-badge">The most popular</div>}
          <h2>{plan.title}</h2>
          <div className="price-box">
            {plan.price!='0 RON'&&
            <>
            <div className="price">{plan.price}</div>
            <small>*RON per year</small>
            </>
            }
            {plan.price=='0 RON'&&
            <><div className="price">Free</div>
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

          <button className="buy-button">Buy {plan.title}</button>
        </div>
      ))}
    </div>
  );
};

export default PricingColumns;