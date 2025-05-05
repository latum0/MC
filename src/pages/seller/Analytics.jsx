

import { useState } from "react"
import { Link } from "react-router-dom"
import "./AdminStyles.css"
import {
  BarChart2,
  Box,
  DollarSign,
  Home,
  Menu,
  Package,
  ShoppingCart,
  TrendingUp,
  User,
  Users,
  X,
} from "react-feather"
import "./Analytics.css"

function Analytics() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [revenueTab, setRevenueTab] = useState("monthly")

  // Mock data for charts
  const revenueData = [
    {
      name: "Jan",
      revenue: 4000,
      profit: 2400,
    },
    {
      name: "Feb",
      revenue: 3000,
      profit: 1398,
    },
    {
      name: "Mar",
      revenue: 9800,
      profit: 5800,
    },
    {
      name: "Apr",
      revenue: 3908,
      profit: 2908,
    },
    {
      name: "May",
      revenue: 4800,
      profit: 3800,
    },
    {
      name: "Jun",
      revenue: 3800,
      profit: 2800,
    },
  ]

  // Mock data for top products
  const topProducts = [
    { name: "Wireless Headphones", revenue: 12500, percentage: 35 },
    { name: "Smart Watch", revenue: 8750, percentage: 25 },
    { name: "Bluetooth Speaker", revenue: 5250, percentage: 15 },
    { name: "Laptop Stand", revenue: 3500, percentage: 10 },
    { name: "Wireless Mouse", revenue: 5250, percentage: 15 },
  ]

  return (
    <div className="analytics-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo">
            <Package size={24} />
            <span>Seller Dashboard</span>
          </Link>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/products" className="nav-item">
            <Package size={18} />
            <span>Products</span>
          </Link>
          <Link to="/inventory" className="nav-item">
            <Box size={18} />
            <span>Inventory</span>
          </Link>
          <Link to="/orders" className="nav-item">
            <ShoppingCart size={18} />
            <span>Orders</span>
          </Link>
          <Link to="/analytics" className="nav-item active">
            <BarChart2 size={18} />
            <span>Analytics</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <User size={18} />
            <span>Profile</span>
          </Link>
        </nav>
      </aside>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            <Package size={24} />
            <span>Seller Dashboard</span>
          </Link>
          <button className="close-menu" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-nav">
          <Link to="/" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/products" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
            <Package size={18} />
            <span>Products</span>
          </Link>
          <Link to="/inventory" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
            <Box size={18} />
            <span>Inventory</span>
          </Link>
          <Link to="/orders" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
            <ShoppingCart size={18} />
            <span>Orders</span>
          </Link>
          <Link to="/analytics" className="nav-item active" onClick={() => setMobileMenuOpen(false)}>
            <BarChart2 size={18} />
            <span>Analytics</span>
          </Link>
          <Link to="/profile" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
            <User size={18} />
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <header className="page-header">
          <div className="header-left">
            <button className="menu-button" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div>
              <h1>Analytics</h1>
              <p>Track your sales performance and revenue</p>
            </div>
          </div>
          <div className="avatar">
            <span>JD</span>
          </div>
        </header>

        <div className="analytics-cards">
          <div className="card">
            <div className="card-header">
              <h3>Total Revenue</h3>
              <DollarSign size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <div className="card-value">$45,231.89</div>
              <p className="card-subtext">+20.1% from last month</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3>Sales</h3>
              <ShoppingCart size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <div className="card-value">+573</div>
              <p className="card-subtext">+201 this month</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3>Customers</h3>
              <Users size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <div className="card-value">+249</div>
              <p className="card-subtext">+30 this month</p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3>Conversion Rate</h3>
              <TrendingUp size={16} className="card-icon" />
            </div>
            <div className="card-content">
              <div className="card-value">3.2%</div>
              <p className="card-subtext">+0.5% from last month</p>
            </div>
          </div>
        </div>

        <div className="analytics-charts">
          <div className="chart-card revenue-profit-card">
            <div className="card-header">
              <h2>Revenue & Profit</h2>
              <p>Compare revenue and profit over time</p>
            </div>
            <div className="chart-tabs">
              <button
                className={`tab ${revenueTab === "weekly" ? "active" : ""}`}
                onClick={() => setRevenueTab("weekly")}
              >
                Weekly
              </button>
              <button
                className={`tab ${revenueTab === "monthly" ? "active" : ""}`}
                onClick={() => setRevenueTab("monthly")}
              >
                Monthly
              </button>
              <button
                className={`tab ${revenueTab === "yearly" ? "active" : ""}`}
                onClick={() => setRevenueTab("yearly")}
              >
                Yearly
              </button>
            </div>
            <div className="chart-container">
              {/* Simple bar chart representation */}
              <div className="bar-chart">
                {revenueData.map((item, index) => (
                  <div key={index} className="bar-group">
                    <div className="bar-label">{item.name}</div>
                    <div className="bars">
                      <div
                        className="bar revenue-bar"
                        style={{ height: `${(item.revenue / 10000) * 200}px` }}
                        title={`Revenue: $${item.revenue}`}
                      ></div>
                      <div
                        className="bar profit-bar"
                        style={{ height: `${(item.profit / 10000) * 200}px` }}
                        title={`Profit: $${item.profit}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color revenue-color"></div>
                  <span>Revenue</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color profit-color"></div>
                  <span>Profit</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-card top-products-card">
            <div className="card-header">
              <h2>Top Products</h2>
              <p>Your best-selling products by revenue</p>
            </div>
            <div className="top-products-container">
              <div className="pie-chart-container">
                <div className="pie-chart">
                  <div className="pie-segment" style={{ "--color": "#4F46E5", "--percentage": "25%" }}></div>
                  <div className="pie-segment" style={{ "--color": "#F97316", "--percentage": "15%" }}></div>
                  <div className="pie-segment" style={{ "--color": "#3B82F6", "--percentage": "35%" }}></div>
                  <div className="pie-segment" style={{ "--color": "#EC4899", "--percentage": "10%" }}></div>
                  <div className="pie-segment" style={{ "--color": "#F59E0B", "--percentage": "15%" }}></div>
                </div>
                <div className="pie-legend">
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: "#4F46E5" }}></span>
                    <span>Smart Watch 25%</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: "#F97316" }}></span>
                    <span>Wireless Mouse 15%</span>
                  </div>
                </div>
              </div>
              <div className="products-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: "#3B82F6" }}></span>
                  <span>Wireless Headphones</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: "#4F46E5" }}></span>
                  <span>Smart Watch</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: "#EC4899" }}></span>
                  <span>Bluetooth Speaker</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: "#F59E0B" }}></span>
                  <span>Wireless Mouse</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: "#F97316" }}></span>
                  <span>Laptop Stand</span>
                </div>
              </div>
              <div className="top-products-table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td className="text-right">${product.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Analytics
