// SellerProducts.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboardIcon, PackageIcon, ShoppingCartIcon, BarChartIcon, UserIcon } from 'lucide-react';
import "./SellerProducts.css";

function SellerProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // Fetch products based on authenticated user
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/products/seller", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const fetchedProducts = data.data || [];

        const productsWithStatus = fetchedProducts.map(product => ({
          ...product,
          status: getStockStatus(product.stock),
        }));

        setProducts(productsWithStatus);
      } catch (err) {
        console.error('Product fetch error:', err.message);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getStockStatus = (stock) => {
    if (stock <= 0) return "out-of-stock";
    if (stock <= 5) return "low-stock";
    return "active";
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      setProducts(products.filter(product => product._id !== productId));
      alert("Product deleted successfully");
    } catch (err) {
      console.error("Deletion error:", err);
      setDeleteError(err.message);
      alert(`Error deleting product: ${err.message}`);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <PackageIcon size={20} />
            <span>Seller Dashboard</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <LayoutDashboardIcon size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/products" className="nav-item active">
            <PackageIcon size={20} />
            <span>Products</span>
          </Link>
          <Link to="/orders" className="nav-item">
            <ShoppingCartIcon size={20} />
            <span>Orders</span>
          </Link>
          <Link to="/analytics" className="nav-item">
            <BarChartIcon size={20} />
            <span>Analytics</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <UserIcon size={20} />
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="page-header">
          <div>
            <h1>Products</h1>
            <p>Manage your product catalog</p>
          </div>
        </div>

        <div className="search-container">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          {error && <div className="error-message">{error}</div>}
          <table className="products-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td><input type="checkbox" /></td>
                    <td className="product-name">{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`badge ${product.status}`}>
                        {product.status === "active"
                          ? "Active"
                          : product.status === "low-stock"
                            ? "Low Stock"
                            : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <div className="dropdown">
                          <button className="btn-icon">
                            <MoreHorizontalIcon size={16} />
                          </button>
                          <div className="dropdown-menu">
                            <Link to={`/products/${product._id}/edit`} className="dropdown-item">
                              <EditIcon size={14} />
                              Edit
                            </Link>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => handleDelete(product._id)}
                            >
                              <Trash2Icon size={14} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-results">
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

export default SellerProducts;