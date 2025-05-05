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
  Search
} from "lucide-react";
import "./Inventory.css";

function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded seller ID for now
  const sellerId = "680becbed8e2df4e5773466c";

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/seller/${sellerId}`);
        if (!response.ok) throw new Error("Failed to fetch products");

        const result = await response.json();
        const fetchedProducts = result.data || [];

        // Convert fetched products to inventory format
        const formattedProducts = fetchedProducts.map(product => ({
          id: product._id,
          name: product.name,
          sku: product.sku || "N/A", // Add SKU field to Product model later
          stock: product.stock,
          status: getStockStatus(product.stock),
          variants: [], // Optional: add variant logic later
        }));

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error fetching products:", err.message);
        setError("Could not load product inventory.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId]);

  // Helper: determine product status based on stock
  const getStockStatus = (stock) => {
    if (stock <= 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (stockFilter === "all" ||
      (stockFilter === "in-stock" && product.status === "In Stock") ||
      (stockFilter === "low-stock" && product.status === "Low Stock") ||
      (stockFilter === "out-of-stock" && product.status === "Out of Stock"))
  );

  // Loading state
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading inventory...</p>
        </div>
      </div>
    );
  }

  // Error state
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
          <Link to="/inventory" className="nav-item active">
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
            <h1>Inventory</h1>
            <p>Manage your product inventory and stock levels</p>
          </div>
          <div className="user-avatar">
            <img src="https://via.placeholder.com/40" alt="User" />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="filters-container">
          <div className="search-input">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="status-filter">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="all">All Products</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Variants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="product-name">{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span
                        className={`badge ${product.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td>
                      {product.variants.length > 0 ? (
                        product.variants.map((variant, index) => (
                          <div key={index} className="variant-item">
                            {variant.name}: {variant.stock}
                          </div>
                        ))
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td>
                      <div className="stock-actions">
                        <input
                          type="number"
                          min="0"
                          defaultValue={product.stock}
                          className="stock-input"
                          onChange={(e) => {
                            // In real app, update via API
                          }}
                        />
                        <button
                          className="update-button"
                          onClick={() =>
                            alert(
                              `Update stock for ${product.name} to ${product.stock}`
                            )
                          }
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-results">
                    No products found matching your criteria.
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

export default Inventory;