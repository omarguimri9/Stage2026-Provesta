import { useState, useEffect } from 'react';
import api from '../services/api';

function AdminDashboard() {
    const [vehicules, setVehicules] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        marque: '', modele: '', annee: '', immatriculation: '',
        prix_par_jour: '', carburant: '', transmission: '',
        categorie_id: 1, agency_id: 1,
    });

    const loadData = () => {
        api.get('/vehicules').then((res) => setVehicules(res.data));
        api.get('/reservations').then((res) => setReservations(res.data));
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/vehicules', form);
            setShowForm(false);
            setForm({ marque: '', modele: '', annee: '', immatriculation: '', prix_par_jour: '', carburant: '', transmission: '', categorie_id: 1, agency_id: 1 });
            loadData();
        } catch (err) {
            alert('Erreur lors de l\'ajout: ' + JSON.stringify(err.response?.data?.errors));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Supprimer ce véhicule ?')) {
            await api.delete(`/vehicules/${id}`);
            loadData();
        }
    };

    const handleStatutChange = async (id, statut) => {
        try {
            await api.put(`/reservations/${id}`, { statut });
            loadData();
        } catch (err) {
            alert('Erreur lors de la mise à jour');
        }
    };

    const statutColor = {
        en_attente: '#f39c12',
        confirmee: '#27ae60',
        annulee: '#e74c3c',
        terminee: '#7f8c8d',
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '30px auto' }}>
            <h2>Dashboard Admin</h2>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ border: '1px solid #444', padding: '20px', borderRadius: '8px', flex: 1 }}>
                    <h3>{vehicules.length}</h3>
                    <p>Véhicules</p>
                </div>
                <div style={{ border: '1px solid #444', padding: '20px', borderRadius: '8px', flex: 1 }}>
                    <h3>{reservations.length}</h3>
                    <p>Réservations</p>
                </div>
                <div style={{ border: '1px solid #444', padding: '20px', borderRadius: '8px', flex: 1 }}>
                    <h3>{reservations.reduce((sum, r) => sum + parseFloat(r.montant_total || 0), 0).toFixed(2)} DT</h3>
                    <p>Revenus totaux</p>
                </div>
            </div>

            {/* SECTION VEHICULES */}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Annuler' : '+ Ajouter un véhicule'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ margin: '20px 0', padding: '20px', border: '1px solid #444', borderRadius: '8px' }}>
                    <div><label>Marque</label><input name="marque" value={form.marque} onChange={handleChange} required /></div>
                    <div><label>Modèle</label><input name="modele" value={form.modele} onChange={handleChange} required /></div>
                    <div><label>Année</label><input name="annee" type="number" value={form.annee} onChange={handleChange} required /></div>
                    <div><label>Immatriculation</label><input name="immatriculation" value={form.immatriculation} onChange={handleChange} required /></div>
                    <div><label>Prix/jour</label><input name="prix_par_jour" type="number" value={form.prix_par_jour} onChange={handleChange} required /></div>
                    <div><label>Carburant</label><input name="carburant" value={form.carburant} onChange={handleChange} required /></div>
                    <div><label>Transmission</label><input name="transmission" value={form.transmission} onChange={handleChange} required /></div>
                    <button type="submit">Enregistrer</button>
                </form>
            )}

            <h3 style={{ marginTop: '30px' }}>Liste des Véhicules</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #444' }}>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Marque</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Modèle</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Prix/jour</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Statut</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicules.map((v) => (
                        <tr key={v.id} style={{ borderBottom: '1px solid #333' }}>
                            <td style={{ padding: '8px' }}>{v.marque}</td>
                            <td style={{ padding: '8px' }}>{v.modele}</td>
                            <td style={{ padding: '8px' }}>{v.prix_par_jour} DT</td>
                            <td style={{ padding: '8px' }}>{v.disponible ? 'Disponible' : 'Indisponible'}</td>
                            <td style={{ padding: '8px' }}>
                                <button onClick={() => handleDelete(v.id)} style={{ backgroundColor: '#e74c3c' }}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* SECTION RESERVATIONS - JDIDA */}
            <h3 style={{ marginTop: '40px' }}>Gestion des Réservations</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #444' }}>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Client</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Véhicule</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Dates</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Montant</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Statut</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((r) => (
                        <tr key={r.id} style={{ borderBottom: '1px solid #333' }}>
                            <td style={{ padding: '8px' }}>{r.user?.name}</td>
                            <td style={{ padding: '8px' }}>{r.vehicule?.marque} {r.vehicule?.modele}</td>
                            <td style={{ padding: '8px' }}>{r.date_debut} → {r.date_fin}</td>
                            <td style={{ padding: '8px' }}>{r.montant_total} DT</td>
                            <td style={{ padding: '8px', color: statutColor[r.statut] }}>{r.statut}</td>
                            <td style={{ padding: '8px' }}>
                                <select value={r.statut} onChange={(e) => handleStatutChange(r.id, e.target.value)}>
                                    <option value="en_attente">En attente</option>
                                    <option value="confirmee">Confirmée</option>
                                    <option value="annulee">Annulée</option>
                                    <option value="terminee">Terminée</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;