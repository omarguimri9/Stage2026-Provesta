import { Link, useNavigate } from 'react-router-dom';

function Navbar({ darkMode, setDarkMode }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', borderBottom: '1px solid #444' }}>
            <div>
                <Link to="/vehicules" style={{ fontWeight: 'bold', fontSize: '18px' }}>🚗 Location Voitures</Link>
                <Link to="/agences" style={{ marginLeft: '20px' }}>Nos Agences</Link>
                {user && <Link to="/mes-reservations" style={{ marginLeft: '20px' }}>Mes Réservations</Link>}
                {user && <Link to="/mes-favoris" style={{ marginLeft: '20px' }}>Mes Favoris</Link>}
                {user && user.role === 'admin' && <Link to="/admin" style={{ marginLeft: '20px' }}>Dashboard</Link>}
            </div>
            <div>
                <button onClick={() => setDarkMode(!darkMode)} style={{ marginRight: '15px' }}>
                    {darkMode ? '☀️ Clair' : '🌙 Sombre'}
                </button>
                {user ? (
                    <>
                        <span style={{ marginRight: '15px' }}>Bonjour, {user.name}</span>
                        <button onClick={handleLogout}>Déconnexion</button>
                    </>
                ) : (
                    <Link to="/login">Connexion</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;