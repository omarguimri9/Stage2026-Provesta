import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Vehicules() {
    const [vehicules, setVehicules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [maxPrix, setMaxPrix] = useState('');
    const [disponibleOnly, setDisponibleOnly] = useState(false);

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

    const filtered = vehicules.filter((v) => {
        const matchSearch = `${v.marque} ${v.modele}`.toLowerCase().includes(search.toLowerCase());
        const matchPrix = maxPrix ? v.prix_par_jour <= parseFloat(maxPrix) : true;
        const matchDispo = disponibleOnly ? v.disponible : true;
        return matchSearch && matchPrix && matchDispo;
    });

    if (loading) return <p>Chargement...</p>;

    return (
        <div style={{ maxWidth: '900px', margin: '30px auto' }}>
            <h2>Nos Véhicules</h2>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Rechercher (marque, modèle)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ flex: 1, minWidth: '200px' }}
                />
                <input
                    type="number"
                    placeholder="Prix max/jour"
                    value={maxPrix}
                    onChange={(e) => setMaxPrix(e.target.value)}
                    style={{ width: '150px' }}
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                        type="checkbox"
                        checked={disponibleOnly}
                        onChange={(e) => setDisponibleOnly(e.target.checked)}
                    />
                    Disponible uniquement
                </label>
            </div>

            {filtered.length === 0 ? (
                <p>Aucun véhicule ne correspond à votre recherche.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    {filtered.map((v) => (
                        <Link key={v.id} to={`/vehicules/${v.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ border: '1px solid #444', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}>
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