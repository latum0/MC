import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart2,
  User,
  Calendar,
  DollarSign,
  Activity,
  Box
} from "lucide-react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sellerId = "680becbed8e2df4e5773466c"; // Hardcoded for now

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await fetch(`http://localhost:5000/api/products/seller/${sellerId}`);
        if (!productsRes.ok) throw new Error("Failed to fetch products");
        const productsData = await productsRes.json();
        const productsList = productsData.data || [];

        // Fetch orders
        const ordersRes = await fetch(`http://localhost:5000/api/orders/seller/${sellerId}`);
        if (!ordersRes.ok) throw new Error("Failed to fetch orders");
        const ordersData = await ordersRes.json();
        const ordersList = ordersData.data || [];

        // Compute stats
        const totalProducts = productsList.length;
        const totalRevenue = ordersList.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        const latestOrders = ordersList
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        // Update state
        setProductsCount(totalProducts);
        setTotalSales(totalRevenue);
        setRecentOrders(latestOrders);
      } catch (err) {
        console.error("Error fetching dashboard data:", err.message);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <LayoutDashboard size={20} />
          <span>Seller Dashboard</span>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item active">
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
          <Link to="/orders" className="nav-item">
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
            <h1>Dashboard</h1>
            <p>Welcome back! Here's an overview of your store performance</p>
          </div>
          <div className="user-avatar">
            <img src="https://via.placeholder.com/40" alt="User" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Package size={24} />
            </div>
            <div className="stat-info">
              <h3>Total Products</h3>
              <p>{productsCount}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <ShoppingCart size={24} />
            </div>
            <div className="stat-info">
              <h3>Total Sales</h3>
              <p>${totalSales.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-info">
              <h3>Recent Orders</h3>
              <p>{recentOrders.length}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Activity size={24} />
            </div>
            <div className="stat-info">
              <h3>Active Listings</h3>
              <p>{productsCount}</p>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id.slice(0, 8)}...</td>
                      <td>{order.user?.name || "Guest"}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>${order.totalAmount?.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">
                      No recent orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Overview Chart (Basic) */}
        <div className="sales-overview">
          <h2>Sales Overview</h2>
          <div className="chart-placeholder">
            <DollarSign size={40} />
            <p>Visual representation of your sales over time will appear here</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;