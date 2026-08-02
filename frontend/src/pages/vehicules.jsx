import { useState, useEffect } from 'react';
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
                        <div key={v.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                            <h3>{v.marque} {v.modele}</h3>
                            <p>Année: {v.annee}</p>
                            <p>Prix/jour: {v.prix_par_jour} DT</p>
                            <p>{v.disponible ? 'Disponible ✅' : 'Non disponible ❌'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Vehicules;