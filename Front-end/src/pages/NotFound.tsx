import { Link } from 'react-router-dom';
import './styles/AllStyles.css'

const NotFound = () => {
    
  return (
    <div className="notfound">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className='notfoundtext'>Go Back to Homepage</Link>
    </div>
  );
};

export default NotFound;
