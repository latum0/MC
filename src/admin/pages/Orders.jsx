import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          window.location.href = '/commandes';
          return;
        }
  
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        setOrders(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/commandes';
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    // Filtre de recherche
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user?.name && order.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.user?.email && order.user.email.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filtre par statut
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Filtre par méthode de paiement
    const matchesPayment = paymentFilter === 'all' || order.payment?.method === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered': return 'status-badge status-success';
      case 'shipped': return 'status-badge status-shipped';
      case 'processing': return 'status-badge status-preparing';
      case 'pending': return 'status-badge status-pending';
      case 'cancelled': return 'status-badge status-cancelled';
      default: return 'status-badge';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      delivered: 'Livrée',
      shipped: 'Expédiée',
      processing: 'En préparation',
      pending: 'En attente',
      cancelled: 'Annulée'
    };
    return statusMap[status] || status;
  };

  const getPaymentMethod = (method) => {
    const paymentMap = {
      credit_card: 'Carte bancaire',
      paypal: 'PayPal',
      bank_transfer: 'Virement bancaire'
    };
    return paymentMap[method] || method;
  };

  if (loading) return <div className="loading">Chargement des commandes...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1 className="page-title">Gestion des Commandes</h1>
        <button className="button button-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="button-icon">
            <path d="M3 6L5 6M5 6L7 6M5 6V4M5 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 18H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Filtres avancés
        </button>
      </div>
      
      <div className="search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="search-icon">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input 
          type="text" 
          placeholder="Rechercher des commandes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="filters-container">
        <select 
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="delivered">Livrée</option>
          <option value="shipped">Expédiée</option>
          <option value="processing">En préparation</option>
          <option value="pending">En attente</option>
        </select>
        
        <select 
          className="filter-select"
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
        >
          <option value="all">Tous les paiements</option>
          <option value="credit_card">Carte bancaire</option>
          <option value="paypal">PayPal</option>
          <option value="bank_transfer">Virement bancaire</option>
        </select>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Commande</th>
              <th>Client</th>
              <th>Date</th>
              <th>Total</th>
              <th>Statut</th>
              <th>Paiement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order._id}>
                  <td>ORD-{order._id.substring(0, 6).toUpperCase()}</td>
                  <td>
                    <div>{order.user?.name || 'Utilisateur inconnu'}</div>
                    {order.user?.email && (
                      <div className="client-email">{order.user.email}</div>
                    )}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td>€{order.totalAmount?.toFixed(2) || '0.00'}</td>
                  <td>
                    <span className={getStatusBadge(order.status)}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td>{getPaymentMethod(order.payment?.method)}</td>
                  <td>
                    <button className="action-button">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-orders">
                  Aucune commande trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;