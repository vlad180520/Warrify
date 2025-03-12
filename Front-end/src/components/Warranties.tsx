import './Warranties.css';
import { useState } from 'react';
import ModalWarranty from './ModalWarranty';

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

  const [selectedWarranty, setSelectedWarranty] = useState<Warranty | null>(null);

  return (
    <div className="warr-container">
      <ul className="warr-header">
        <li>Product Name</li>
        <li>Date bought</li>
        <li>Date of expirance</li>
        <li>Product provider</li>
      </ul>
      {warranties.map((warranty, index) => (
        <div
          key={index}
          className="warr-entry"
          onClick={() => setSelectedWarranty(warranty)}
          role="button"
          tabIndex={0}
        >
          <ul className="warr-line">
            <li className="warr-element-prdName">{warranty.prdName}</li>
            <li className="warr-element-dataCump">{warranty.dataCump}</li>
            <li className="warr-element-dataExp">{warranty.dataExp}</li>
            <li className="warr-element-com">{warranty.comp}</li>
          </ul>
        </div>
      ))}
      {selectedWarranty && (
        <ModalWarranty onClose={() => setSelectedWarranty(null)}>
          <h2>{selectedWarranty.prdName} Details</h2>
          <div className="modal-details">
            <p><strong>Purchase Date:</strong> {selectedWarranty.dataCump}</p>
            <p><strong>Expiration Date:</strong> {selectedWarranty.dataExp}</p>
            <p><strong>Provider:</strong> {selectedWarranty.comp}</p>
          </div>
          <button className='button buttoninvert modal-war-2'>View PDF</button>
          <button className='button buttoninvert modal-war'>Save PDF</button>
        </ModalWarranty>
      )}
    </div>
  );
}

export default Warranties;