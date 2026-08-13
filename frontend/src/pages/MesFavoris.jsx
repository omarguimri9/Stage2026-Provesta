import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function MesFavoris() {
    const [favoris, setFavoris] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = () => {
        api.get('/favorites').then((res) => {
            setFavoris(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    const removeFavori = async (id) => {
        await api.delete(`/favorites/${id}`);
        loadData();
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div style={{ maxWidth: '900px', margin: '30px auto' }}>
            <h2>Mes Favoris</h2>
            {favoris.length === 0 ? (
                <p>Vous n'avez aucun véhicule favori.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {favoris.map((f) => (
                        <div key={f.id} style={{ border: '1px solid #444', padding: '15px', borderRadius: '8px' }}>
                            <h3>{f.vehicule?.marque} {f.vehicule?.modele}</h3>
                            <p>Prix/jour: {f.vehicule?.prix_par_jour} DT</p>
                            <Link to={`/vehicules/${f.vehicle_id}`}>Voir détails</Link>
                            <br />
                            <button onClick={() => removeFavori(f.id)} style={{ marginTop: '10px', backgroundColor: '#e74c3c' }}>
                                Retirer des favoris
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MesFavoris;