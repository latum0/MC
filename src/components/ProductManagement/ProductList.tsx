import React, { useState, useEffect } from 'react';
import './ProductList.css';
import { Product } from '../../utils/types';
import { Edit, Trash2, PlusCircle, Search, Filter } from 'lucide-react';
import { useDebounce } from '../../utils/hooks';

interface ProductListProps {
  products: Product[];
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Unique categories from products
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Apply filters and search
  useEffect(() => {
    let results = [...products];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(product => product.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(product => product.status === statusFilter);
    }
    
    // Apply search
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      results = results.filter(product => 
        product.title.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredProducts(results);
  }, [products, categoryFilter, statusFilter, debouncedSearchTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onDelete(id);
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1 className="product-list-title">Products</h1>
        <button className="add-product-button" onClick={onAdd}>
          <PlusCircle size={20} />
          <span>Add Product</span>
        </button>
      </div>
      
      <div className="product-list-filters">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <div className="filter-group">
            <label htmlFor="category-filter" className="filter-label">
              <Filter size={16} />
              Category:
            </label>
            <select 
              id="category-filter" 
              value={categoryFilter} 
              onChange={e => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
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
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found.</p>
          {searchTerm && <p>Try adjusting your search or filters.</p>}
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={product.images[0] || 'https://via.placeholder.com/300x200'} 
                  alt={product.title} 
                  className="product-image" 
                />
                <div className={`product-status ${product.status}`}>
                  {product.status}
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-details">
                  <p className="product-price">{formatCurrency(product.price)}</p>
                  <p className="product-stock">Stock: {product.stock}</p>
                </div>
                <div className="product-actions">
                  <button 
                    className="edit-button" 
                    onClick={() => onEdit(product)}
                    aria-label="Edit product"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDeleteClick(product.id)}
                    aria-label="Delete product"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;