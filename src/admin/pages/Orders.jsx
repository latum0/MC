import React from 'react';
import './Orders.css';

function Orders() {
  return (
    <div className="orders-page">
      <div className="page-header">
        <h1 className="page-title">Gestion des Commandes</h1>
        <button className="button button-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-icon">
            <path d="M3 6L5 6M5 6L7 6M5 6V4M5 6V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 18H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Filtres avancés
        </button>
      </div>
      
      <div className="search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input type="text" placeholder="Rechercher des commandes..." />
      </div>
      
      <div className="filters-container">
        <select className="filter-select">
          <option>Tous les statuts</option>
          <option>Livrée</option>
          <option>En cours de livraison</option>
          <option>Expédiée</option>
          <option>En préparation</option>
          <option>Payée</option>
        </select>
        
        <select className="filter-select">
          <option>Tous les paiements</option>
          <option>Carte bancaire</option>
          <option>PayPal</option>
          <option>Virement bancaire</option>
        </select>
      </div>
      
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
          <tr>
            <td>ORD-7234</td>
            <td>
              <div>Jean Dupont</div>
              <div className="client-email">jean.dupont@example.com</div>
            </td>
            <td>2023-07-15</td>
            <td>€1499.98</td>
            <td><span className="status-badge status-success">Livrée</span></td>
            <td>Carte bancaire</td>
            <td>
              <button className="action-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </td>
          </tr>
          <tr>
            <td>ORD-6523</td>
            <td>
              <div>Marie Martin</div>
              <div className="client-email">marie.martin@example.com</div>
            </td>
            <td>2023-07-14</td>
            <td>€899.99</td>
            <td><span className="status-badge status-pending">En cours de livraison</span></td>
            <td>PayPal</td>
            <td>
              <button className="action-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </td>
          </tr>
          <tr>
            <td>ORD-5872</td>
            <td>
              <div>Pierre Durand</div>
              <div className="client-email">pierre.durand@example.com</div>
            </td>
            <td>2023-07-13</td>
            <td>€249.97</td>
            <td><span className="status-badge status-shipped">Expédiée</span></td>
            <td>Carte bancaire</td>
            <td>
              <button className="action-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </td>
          </tr>
          <tr>
            <td>ORD-4921</td>
            <td>
              <div>Sophie Leroy</div>
              <div className="client-email">sophie.leroy@example.com</div>
            </td>
            <td>2023-07-12</td>
            <td>€1299.99</td>
            <td><span className="status-badge status-preparing">En préparation</span></td>
            <td>Virement bancaire</td>
            <td>
              <button className="action-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Orders;