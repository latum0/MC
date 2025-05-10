import React, { useState, useEffect } from 'react';
import './OrderList.css';
import { Order } from '../../utils/types';
import { Search, Filter, Eye } from 'lucide-react';
import { useDebounce } from '../../utils/hooks';

interface OrderListProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [sortField, setSortField] = useState<'date' | 'total'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Apply filters, search, and sort
  useEffect(() => {
    let results = [...orders];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(order => order.status === statusFilter);
    }
    
    // Apply search
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      results = results.filter(order => 
        order.id.toLowerCase().includes(searchLower) || 
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    results.sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime() 
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortDirection === 'asc' 
          ? a.total - b.total 
          : b.total - a.total;
      }
    });
    
    setFilteredOrders(results);
  }, [orders, statusFilter, debouncedSearchTerm, sortField, sortDirection]);
  
  const handleSort = (field: 'date' | 'total') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
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
      month: 'short',
      day: 'numeric',
    }).format(date);
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
  
  return (
    <div className="order-list-container">
      <div className="order-list-header">
        <h1 className="order-list-title">Customer Orders</h1>
      </div>
      
      <div className="order-list-filters">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <div className="filter-group">
            <label htmlFor="status-filter" className="filter-label">
              <Filter size={16} />
              Status:
            </label>
            <select 
              id="status-filter" 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
          {searchTerm && <p>Try adjusting your search or filters.</p>}
        </div>
      ) : (
        <div className="order-table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th 
                  className={`sortable ${sortField === 'date' ? `sorted-${sortDirection}` : ''}`}
                  onClick={() => handleSort('date')}
                >
                  Date
                </th>
                <th>Customer</th>
                <th 
                  className={`sortable ${sortField === 'total' ? `sorted-${sortDirection}` : ''}`}
                  onClick={() => handleSort('total')}
                >
                  Total
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{formatDate(order.date)}</td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{order.customer.name}</span>
                      <span className="customer-email">{order.customer.email}</span>
                    </div>
                  </td>
                  <td className="order-total">{formatCurrency(order.total)}</td>
                  <td>
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="view-details-button" 
                      onClick={() => onViewDetails(order)}
                      aria-label="View order details"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;