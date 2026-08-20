import { useState, useEffect } from 'react';
import api from '../services/api';

function Agences() {
    const [agences, setAgences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/agencies').then((res) => {
            setAgences(res.data);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Chargement...</p>;

    return (
        <div style={{ maxWidth: '900px', margin: '30px auto' }}>
            <h2>Nos Agences</h2>
            {agences.length === 0 ? (
                <p>Aucune agence disponible pour le moment.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    {agences.map((a) => (
                        <div key={a.id} style={{ border: '1px solid #444', padding: '15px', borderRadius: '8px' }}>
                            <h3>{a.nom}</h3>
                            <p>📍 {a.adresse}, {a.ville}</p>
                            <p>📞 {a.telephone}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Agences;