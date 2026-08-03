import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Vehicules() {
    const [vehicules, setVehicules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/vehicules')
            .then((response) => {
                setVehicules(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <div style={{ maxWidth: '900px', margin: '30px auto' }}>
            <h2>Nos Véhicules</h2>
            {vehicules.length === 0 ? (
                <p>Aucun véhicule disponible pour le moment.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {vehicules.map((v) => (
                        <Link key={v.id} to={`/vehicules/${v.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}>
                                <h3>{v.marque} {v.modele}</h3>
                                <p>Année: {v.annee}</p>
                                <p>Prix/jour: {v.prix_par_jour} DT</p>
                                <p>{v.disponible ? 'Disponible ✅' : 'Non disponible ❌'}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Vehicules;