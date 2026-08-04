import { useState, useEffect } from 'react';
import api from '../services/api';

function MesReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        api.get('/reservations')
            .then((response) => {
                const mine = response.data.filter((r) => r.user_id === user.id);
                setReservations(mine);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const statutColor = {
        en_attente: 'orange',
        confirmee: 'green',
        annulee: 'red',
        terminee: 'gray',
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div style={{ maxWidth: '700px', margin: '30px auto' }}>
            <h2>Mes Réservations</h2>
            {reservations.length === 0 ? (
                <p>Vous n'avez aucune réservation.</p>
            ) : (
                reservations.map((r) => (
                    <div key={r.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                        <h3>{r.vehicule?.marque} {r.vehicule?.modele}</h3>
                        <p>Du {r.date_debut} au {r.date_fin}</p>
                        <p>Montant total: {r.montant_total} DT</p>
                        <p>Statut: <span style={{ color: statutColor[r.statut] }}>{r.statut}</span></p>
                    </div>
                ))
            )}
        </div>
    );
}

export default MesReservations;