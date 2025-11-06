// LoginLightbox.tsx
import { useState } from 'react';
import './LoginLightbox.css'; // Importăm fișierul CSS separat

const LoginLightbox = () => {
  const [isVisible] = useState(true);

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };
  const handleRegisterRedirect = () => {
    window.location.href = '/register';
  };
  if (!isVisible) return null;

  return (
    <div
      className="login-lightbox-overlay"
    >
      <div
        className="login-lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="lightbox-title">
          Please Login or Register
        </h2>
        <div className='flex'>
          <button
            onClick={handleLoginRedirect}
            className="login-button"
          >
            Login
          </button>
          <button
            onClick={handleRegisterRedirect}
            className="login-button"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginLightbox;
