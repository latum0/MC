

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./AddProduct.css"

function AddProduct() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("general")
  const [isLoading, setIsLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Product added successfully!")
      navigate("/products")
    }, 1000)
  }

  return (
    <div className="add-product-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <i className="icon-package"></i>
            <span>Seller Dashboard</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <i className="icon-home"></i>
            <span>Dashboard</span>
          </Link>
          <Link to="/products" className="nav-item active">
            <i className="icon-package"></i>
            <span>Products</span>
          </Link>
          <Link to="/inventory" className="nav-item">
            <i className="icon-box"></i>
            <span>Inventory</span>
          </Link>
          <Link to="/orders" className="nav-item">
            <i className="icon-shopping-cart"></i>
            <span>Orders</span>
          </Link>
          <Link to="/analytics" className="nav-item">
            <i className="icon-bar-chart"></i>
            <span>Analytics</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <i className="icon-user"></i>
            <span>Profile</span>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {/* <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
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
          <Link to="/products" className="nav-item active" onClick={() => setMobileMenuOpen(false)}>
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
          <Link to="/analytics" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
            <BarChart3 size={18} />
            <span>Analytics</span>
          </Link>
          <Link to="/profile" className="nav-item" onClick={() => setMobileMenuOpen(false)}>
            <User size={18} />
          </Link>
        </nav>
      </div> */}

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Add New Product</h1>
            <p>Create a new product with details and inventory information</p>
          </div>
        </div>

        {/* Add Product Form */}
        <form onSubmit={handleSubmit} className="add-product-form">
          {/* Tabs */}
          <div className="form-tabs">
            <button
              type="button"
              className={activeTab === "general" ? "active" : ""}
              onClick={() => setActiveTab("general")}
            >
              General
            </button>
            <button
              type="button"
              className={activeTab === "inventory" ? "active" : ""}
              onClick={() => setActiveTab("inventory")}
            >
              Inventory
            </button>
            <button
              type="button"
              className={activeTab === "images" ? "active" : ""}
              onClick={() => setActiveTab("images")}
            >
              Images
            </button>
          </div>

          {/* General Tab */}
          <div className={`tab-content ${activeTab === "general" ? "active" : ""}`}>
            <div className="card">
              <div className="card-header">
                <h3>General Information</h3>
                <p>Enter the basic details of your product</p>
              </div>
              <div className="card-content">
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input type="text" id="name" placeholder="Enter product name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea id="description" placeholder="Enter product description" rows="4"></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category">
                      <option value="">Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="accessories">Accessories</option>
                      <option value="home">Home & Kitchen</option>
                      <option value="beauty">Beauty & Personal Care</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input type="number" id="price" placeholder="0.00" step="0.01" min="0" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <input type="text" id="tags" placeholder="Enter tags separated by commas" />
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Tab */}
          <div className={`tab-content ${activeTab === "inventory" ? "active" : ""}`}>
            <div className="card">
              <div className="card-header">
                <h3>Inventory Information</h3>
                <p>Manage your product inventory and variants</p>
              </div>
              <div className="card-content">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="sku">SKU</label>
                    <input type="text" id="sku" placeholder="Enter SKU" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock">Stock Quantity</label>
                    <input type="number" id="stock" placeholder="0" min="0" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Product Variants</label>
                  <div className="variant-card">
                    <div className="variant-card-header">
                      <h4>Add Variants</h4>
                    </div>
                    <div className="variant-card-content">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="variant-type">Variant Type</label>
                          <select id="variant-type">
                            <option value="">Select type</option>
                            <option value="color">Color</option>
                            <option value="size">Size</option>
                            <option value="material">Material</option>
                            <option value="style">Style</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="variant-value">Variant Value</label>
                          <input type="text" id="variant-value" placeholder="Enter value" />
                        </div>
                      </div>
                      <button type="button" className="btn btn-outline">
                        Add Variant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Images Tab */}
          <div className={`tab-content ${activeTab === "images" ? "active" : ""}`}>
            <div className="card">
              <div className="card-header">
                <h3>Product Images</h3>
                <p>Upload images of your product</p>
              </div>
              <div className="card-content">
                <div className="image-upload-container">
                  <div className="image-upload-area">
                    <div className="upload-icon">
                      <i className="icon-image"></i>
                    </div>
                    <div className="upload-text">
                      <p>Drag & Drop files</p>
                      <span>or click to browse</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <Link to="/products" className="btn btn-outline">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default AddProduct
