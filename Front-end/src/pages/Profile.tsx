import { useState } from 'react';
import './styles/Profile.css'
import Header from '../components/Header';
import { Link } from 'react-router-dom';
type UserProfile = {
    id: number;
    fullName: string;
    email: string;
    registrationDate: string;
    subscription: {
        type: 'Gratuit' | 'Premium' | 'Enterprise';
        expires: string;
    };
};

const Profile = () => {
    // Simulare date din baza de date
    const [userData] = useState<UserProfile>({
        id: 12345,
        fullName: 'Andrei Popescu',
        email: 'andrei.popescu@example.com',
        registrationDate: '15 Martie 2023',
        subscription: {
            type: 'Premium',
            expires: '15 Decembrie 2024',
        }
    });

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="titluprofile"><h1>Profil utilizator</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" className="user" viewBox="0 0 32 32"><path d="M16 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM27 32a1 1 0 0 1-1-1v-6.115a6.95 6.95 0 0 0-6.942-6.943h-6.116A6.95 6.95 0 0 0 6 24.885V31a1 1 0 1 1-2 0v-6.115c0-4.93 4.012-8.943 8.942-8.943h6.116c4.93 0 8.942 4.012 8.942 8.943V31a1 1 0 0 1-1 1z"/></svg>
                </div>
                <div className="profile-section">
                    <h2>Date personale</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Nume complet:</span>
                            <span className="value">{userData.fullName}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Email:</span>
                            <span className="value">{userData.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Data înregistrării:</span>
                            <span className="value">{userData.registrationDate}</span>
                        </div>
                        <div className="info-item">
                        <Link to='/change-password'><span className="buttonsubs">Change Password</span></Link>
                        </div>
                    </div>
                </div>

                <div className="subscription-section">
                    <h2>Abonament curent</h2>
                    <div className="subscription-card">
                        <div className="subscription-header">
                            <Link to='/pricing'><span className="buttonsubs">{userData.subscription.type}</span></Link>
                            <span className="expiry-date">Expiră: {userData.subscription.expires}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;