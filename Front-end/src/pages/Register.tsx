// RegisterForm.tsx
import Header from '../components/Header';
import { useState } from 'react';
import './styles/Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Numele este obligatoriu';
    }

    if (!email) {
      newErrors.email = 'Adresa de email este obligatorie';
    }

    if (!password) {
      newErrors.password = 'Parola este obligatorie';
    } else if (password.length < 8) {
      newErrors.password = 'Parola trebuie să aibă minim 8 caractere';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Parolele nu coincid';
    }

    if (!terms) {
      newErrors.terms = 'Trebuie să accepți termenii și condițiile';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Trimite datele la server
    console.log('Register data:', { name, email, password, terms });
    setErrors({});
  };

  return (
    <>
    <Header />
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Înregistrare</h2>

        <div className="form-group">
          <label htmlFor="name">Nume complet</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmă parola</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="terms-group">
          <label>
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            Accept <a href="/terms">termenii și condițiile</a>
          </label>
        </div>
        {errors.terms && <span className="error-message eroaretermeni">{errors.terms}</span>}

        <button type="submit" className="submit-btn">
          Creează cont
        </button>
      </form>
    </div>
    </>
  );
};

export default Register;