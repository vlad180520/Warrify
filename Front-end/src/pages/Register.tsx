// RegisterForm.tsx
import Header from '../components/Header';
import { useState } from 'react';
import './styles/Register.css';
import { Navigate } from 'react-router-dom';
import { Link,useNavigate } from 'react-router-dom';

const Register = () => {

  
  const navigate = useNavigate()
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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'The name is mandatory';
    }

    if (!email) {
      newErrors.email = 'The email in mandatory';
    }

    if (!password) {
      newErrors.password = 'The password in mandatory';
    } else if (password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!terms) {
      newErrors.terms = 'You have to accept terms and conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const username = name
    // Trimite datele la server
    // console.log('Register data:', { name, email, password, terms });
    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, terms }),
        // body: JSON.stringify({ userId, email, username, firstName, lastName, password, dateOfBirth }),
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
      
      if (response.ok) {
        console.log("Registration Successful");
        navigate('/')
      } else {
        console.error("Registration Failed:", data);
        setErrors({ email: data.message || "Registration failed." });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors({ email: "An error occurred. Please try again later." });
    }

    // setErrors({});
  };

  return (
    <>
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>

        <div className="form-group">
          <label htmlFor="name">Full name</label>
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
          <label htmlFor="password">Password</label>
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
          <label htmlFor="confirmPassword">Confirm password</label>
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
            Accept <a href="/terms">terms and conditions</a>
          </label>
        </div>
        {errors.terms && <span className="error-message eroaretermeni">{errors.terms}</span>}

        <button type="submit" className="submit-btn">
          Create account
        </button>
      </form>
    </div>
    </>
  );
};

export default Register;