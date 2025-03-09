import './Warranties.css';

interface Warranty {
  prdName: string;
  dataExp: string;
  dataCump: string;
  comp: string;
}

interface WarrantiesProps {
  warranties: Warranty[];
}

function Warranties({ warranties }: WarrantiesProps) {
  return (
    <div className="warr-container">
      <ul className="warr-header">
        <li>Product Name</li>
        <li>Date bought</li>
        <li>Date of expirance</li>
        <li>Product provider</li>
      </ul>
      {warranties.map((warranty, index) => (
        <div key={index} className="warr-entry">
          <ul className="warr-line">
            <li className="warr-element-prdName">{warranty.prdName}</li>
            <li className="warr-element-dataCump">{warranty.dataCump}</li>
            <li className="warr-element-dataExp">{warranty.dataExp}</li>
            <li className="warr-element-com">{warranty.comp}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Warranties;