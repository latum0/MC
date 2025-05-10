import React, { useState } from 'react';
import './OrderDetails.css';
import { Order } from '../../utils/types';
import { ArrowLeft, Download, User, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';

interface OrderDetailsProps {
  order: Order;
  onStatusUpdate: (id: string, status: string) => void;
  onBack: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onStatusUpdate, onBack }) => {
  const [status, setStatus] = useState(order.status);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusUpdate(order.id, newStatus);
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };
  
  const handleDownloadInvoice = () => {
    alert('Invoice download functionality would be implemented here.');
  };
  
  return (
    <div className="order-details-container">
      <div className="order-details-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Orders</span>
        </button>
        <h1 className="order-details-title">Order Details</h1>
      </div>
      
      <div className="order-summary-container">
        <div className="order-info-card">
          <div className="order-info-header">
            <div>
              <h2 className="order-id">{order.id}</h2>
              <div className="order-date">{formatDate(order.date)}</div>
            </div>
            <div className="order-actions">
              <select
                value={status}
                onChange={handleStatusChange}
                className={`status-select ${getStatusClass(status)}`}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button className="download-invoice-button" onClick={handleDownloadInvoice}>
                <Download size={16} />
                <span>Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="order-details-content">
        <div className="order-section order-customer-section">
          <h2 className="section-title">Customer Information</h2>
          <div className="customer-card">
            <div className="customer-info-grid">
              <div className="customer-info-item">
                <User className="info-icon" size={16} />
                <div>
                  <div className="info-label">Name</div>
                  <div className="info-value">{order.customer.name}</div>
                </div>
              </div>
              <div className="customer-info-item">
                <Mail className="info-icon" size={16} />
                <div>
                  <div className="info-label">Email</div>
                  <div className="info-value">{order.customer.email}</div>
                </div>
              </div>
              <div className="customer-info-item">
                <Phone className="info-icon" size={16} />
                <div>
                  <div className="info-label">Phone</div>
                  <div className="info-value">{order.customer.phone}</div>
                </div>
              </div>
              <div className="customer-info-item">
                <MapPin className="info-icon" size={16} />
                <div>
                  <div className="info-label">Shipping Address</div>
                  <div className="info-value">{order.customer.address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-section order-items-section">
          <h2 className="section-title">Order Items</h2>
          <div className="order-items-card">
            <div className="order-items-header">
              <div className="order-items-count">
                <ShoppingBag size={16} />
                <span>{order.items.length} items</span>
              </div>
              <div className="order-total">{formatCurrency(order.total)}</div>
            </div>
            
            <div className="order-items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image-container">
                    <img src={item.image} alt={item.title} className="item-image" />
                  </div>
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    <div className="item-price-qty">
                      <span className="item-price">{formatCurrency(item.price)}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                  </div>
                  <div className="item-total">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-summary">
              <div className="summary-row">
                <div className="summary-label">Subtotal</div>
                <div className="summary-value">{formatCurrency(order.total)}</div>
              </div>
              <div className="summary-row">
                <div className="summary-label">Shipping</div>
                <div className="summary-value">$0.00</div>
              </div>
              <div className="summary-row">
                <div className="summary-label">Tax</div>
                <div className="summary-value">Included</div>
              </div>
              <div className="summary-row total-row">
                <div className="summary-label">Total</div>
                <div className="summary-value">{formatCurrency(order.total)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;