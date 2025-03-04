import { useState } from 'react';
import './styles/Login.css';
import Header from '../components/Header';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'Adresa de email este obligatorie';
    }

    if (!password) {
      newErrors.password = 'Parola este obligatorie';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Trimite datele la server
    console.log('Login data:', { email, password, rememberMe });
    setErrors({});
  };

  return (
    <div className='login'>
    <Header />
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Autentificare</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Parolă</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Ține-mă minte
          </label>
          <a href="/forgot-password">Ai uitat parola?</a>
        </div>

        <button type="submit" className="submit-btn">
          Conectează-te
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;