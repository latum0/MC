import React from 'react';
import './Payments.css';

function Payments() {
  return (
    <div className="payments-page">
      <div className="page-header">
        <h1 className="page-title">Paiements aux Vendeurs</h1>
        <button className="button button-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="button-icon">
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Nouveau paiement
        </button>
      </div>
      
      <div className="search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon">
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input type="text" placeholder="Rechercher des paiements..." />
      </div>
      
      <div className="filters-container">
        <select className="filter-select">
          <option>Tous les statuts</option>
          <option>Payé</option>
          <option>En attente</option>
          <option>Programmé</option>
        </select>
        
        <select className="filter-select">
          <option>Toutes les méthodes</option>
          <option>Virement bancaire</option>
          <option>PayPal</option>
        </select>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendeur</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Méthode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PAY-1234</td>
            <td>
              <div>TechStore</div>
              <div className="vendor-email">contact@techstore.com</div>
            </td>
            <td>€2499.97</td>
            <td><span className="status-badge status-paid">Payé</span></td>
            <td>2023-07-15</td>
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
          <tr>
            <td>PAY-2345</td>
            <td>
              <div>GamerZone</div>
              <div className="vendor-email">finance@gamerzone.com</div>
            </td>
            <td>€1899.95</td>
            <td><span className="status-badge status-waiting">En attente</span></td>
            <td>2023-07-20</td>
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
            <td>PAY-3456</td>
            <td>
              <div>ComponentsPlus</div>
              <div className="vendor-email">payments@componentsplus.com</div>
            </td>
            <td>€3299.99</td>
            <td><span className="status-badge status-paid">Payé</span></td>
            <td>2023-07-10</td>
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
          <tr>
            <td>PAY-4567</td>
            <td>
              <div>PCBuilder</div>
              <div className="vendor-email">finance@pcbuilder.com</div>
            </td>
            <td>€1599.98</td>
            <td><span className="status-badge status-scheduled">Programmé</span></td>
            <td>2023-07-25</td>
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

export default Payments;