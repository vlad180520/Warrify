import { ReactNode } from 'react';
import './ModalWarranty.css';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalWarranty = ({ children, onClose }: ModalProps) => {
  return (
    <div className="modal-war-overlay" onClick={onClose}>
      <div className="modal-war-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-war-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default ModalWarranty;