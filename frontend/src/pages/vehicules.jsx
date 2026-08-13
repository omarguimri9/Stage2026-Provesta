import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Vehicules() {
    const [vehicules, setVehicules] = useState([]);
    const [favoris, setFavoris] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [maxPrix, setMaxPrix] = useState('');
    const [disponibleOnly, setDisponibleOnly] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const loadData = () => {
        api.get('/vehicules').then((res) => {
            setVehicules(res.data);
            setLoading(false);
        });
        if (user) {
            api.get('/favorites').then((res) => setFavoris(res.data));
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const isFavori = (vehiculeId) => favoris.some((f) => f.vehicle_id === vehiculeId);

    const toggleFavori = async (e, vehiculeId) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert('Connectez-vous pour ajouter aux favoris');
            return;
        }

        try {
            const favori = favoris.find((f) => f.vehicle_id === vehiculeId);

            if (favori) {
                await api.delete(`/favorites/${favori.id}`);
                setFavoris(favoris.filter((f) => f.id !== favori.id));
            } else {
                const response = await api.post('/favorites', { user_id: user.id, vehicle_id: vehiculeId });
                setFavoris([...favoris, response.data]);
            }
        } catch (err) {
            alert('Erreur: ' + JSON.stringify(err.response?.data));
        }
    };

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
                        <div key={v.id} style={{ position: 'relative' }}>
                            {user && (
                                <button
                                    onClick={(e) => toggleFavori(e, v.id)}
                                    style={{
                                        position: 'absolute', top: '10px', right: '10px', zIndex: 1,
                                        background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer',
                                        padding: 0,
                                    }}
                                >
                                    {isFavori(v.id) ? '❤️' : '🤍'}
                                </button>
                            )}
                            <Link to={`/vehicules/${v.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ border: '1px solid #444', padding: '15px', borderRadius: '8px', cursor: 'pointer' }}>
                                    <h3>{v.marque} {v.modele}</h3>
                                    <p>Année: {v.annee}</p>
                                    <p>Prix/jour: {v.prix_par_jour} DT</p>
                                    <p>{v.disponible ? 'Disponible ✅' : 'Non disponible ❌'}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Vehicules;