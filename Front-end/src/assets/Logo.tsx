import './Logo.css';

const Logo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150" className="logo-container">
        <g transform="translate(20 25)">
            <path className="w-letter" d="M0 0L25 100 50 0 75 100 100 0 125 100 150 0" transform="scale(0.6)"/>
            <line className="cross-line" x1="15" y1="25" x2="75" y2="85"/>
            <line className="cross-line" x1="105" y1="25" x2="165" y2="85"/>
        </g>
        <text x="170" y="95" className="logo-text">Warrify</text>
    </svg>
);

export default Logo;