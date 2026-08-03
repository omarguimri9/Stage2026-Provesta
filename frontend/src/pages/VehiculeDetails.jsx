import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function VehiculeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicule, setVehicule] = useState(null);
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get(`/vehicules/${id}`).then((response) => setVehicule(response.data));
    }, [id]);

    const handleReservation = async (e) => {
        e.preventDefault();
        setMessage('');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/login');
            return;
        }

        try {
            await api.post('/reservations', {
                user_id: user.id,
                vehicle_id: id,
                date_debut: dateDebut,
                date_fin: dateFin,
            });
            setMessage('Réservation créée avec succès !');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Erreur lors de la réservation');
        }
    };

    if (!vehicule) return <p>Chargement...</p>;

    return (
        <div style={{ maxWidth: '600px', margin: '30px auto' }}>
            <h2>{vehicule.marque} {vehicule.modele}</h2>
            <p>Année: {vehicule.annee}</p>
            <p>Couleur: {vehicule.couleur}</p>
            <p>Carburant: {vehicule.carburant}</p>
            <p>Transmission: {vehicule.transmission}</p>
            <p>Places: {vehicule.nombre_places}</p>
            <p>Kilométrage: {vehicule.kilometrage} km</p>
            <p>Description: {vehicule.description}</p>
            <p><strong>Prix/jour: {vehicule.prix_par_jour} DT</strong></p>

            <hr />
            <h3>Réserver ce véhicule</h3>
            {message && <p style={{ color: message.includes('succès') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleReservation}>
                <div>
                    <label>Date début</label>
                    <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
                </div>
                <div>
                    <label>Date fin</label>
                    <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
                </div>
                <button type="submit">Réserver</button>
            </form>
        </div>
    );
}

export default VehiculeDetails;