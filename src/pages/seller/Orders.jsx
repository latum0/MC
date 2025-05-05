import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Cuboid as CubeIcon,
  LayoutDashboard,
  Package,
  Box,
  ShoppingCart,
  BarChart2,
  User,
  Search,
  MoreVertical,
  Eye
} from "lucide-react";
import "./Orders.css";

function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded seller ID
  const sellerId = "680becbed8e2df4e5773466c";

  // Simulated seller info
  const simulatedSeller = {
    name: "John Doe",
    storeName: "TechGear Store",
    avatar: "https://via.placeholder.com/40"
  };

  // Fetch orders for the seller
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/orders/seller/${sellerId}`);
        if (!response.ok) throw new Error("Failed to fetch orders");

        const result = await response.json();
        const ordersData = result.data || [];

        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
        setError("Could not load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [sellerId]);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Loading state
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <CubeIcon size={20} />
          <span>Seller Dashboard</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/products" className="nav-item">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link to="/inventory" className="nav-item">
            <Box size={20} />
            <span>Inventory</span>
          </Link>
          <Link to="/orders" className="nav-item active">
            <ShoppingCart size={20} />
            <span>Orders</span>
          </Link>
          <Link to="/analytics" className="nav-item">
            <BarChart2 size={20} />
            <span>Analytics</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <User size={20} />
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Orders</h1>
            <p>Manage and process customer orders</p>
          </div>
          <div className="user-avatar">
            <img src={simulatedSeller.avatar} alt="Seller" />
            <span className="seller-name">{simulatedSeller.storeName}</span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="filters-container">
          <div className="search-input">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="status-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-id">{order._id}</td>
                    <td>
                      <div className="customer-info">
                        <p>{order.user?.name}</p>
                        <span>{order.user?.email}</span>
                      </div>
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={`badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="order-total">${order.totalAmount?.toFixed(2)}</td>
                    <td>
                      <div className="actions">
                        <div className="dropdown">
                          <button className="btn-icon">
                            <MoreVertical size={18} />
                          </button>
                          <div className="dropdown-menu">
                            <div className="dropdown-header">Actions</div>
                            <Link
                              to={`/orders/${order._id}`}
                              className="dropdown-item"
                            >
                              <Eye size={16} className="mr-2" />
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-orders">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Orders;