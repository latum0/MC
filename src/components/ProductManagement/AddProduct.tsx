import React, { useState } from 'react';
import './AddProduct.css';
import { Product } from '../../utils/types';
import { X, Plus, ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface AddProductProps {
  onAdd: (product: Product) => void;
  onCancel: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [imageUrl, setImageUrl] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const categories = ['clothing', 'electronics', 'home', 'beauty', 'food', 'other'];

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!title.trim()) errors.title = 'Title is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!price.trim()) errors.price = 'Price is required';
    else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) 
      errors.price = 'Price must be a positive number';
    
    if (!stock.trim()) errors.stock = 'Stock quantity is required';
    else if (isNaN(parseInt(stock)) || parseInt(stock) < 0)
      errors.stock = 'Stock must be a non-negative integer';
    
    if (!category) errors.category = 'Category is required';
    if (images.length === 0) errors.images = 'At least one product image is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const newProduct: Product = {
      id: '', // Will be set in the App component
      title,
      description,
      price: parseFloat(price),
      images,
      stock: parseInt(stock),
      category,
      status,
      createdAt: new Date().toISOString(),
    };
    
    onAdd(newProduct);
  };

  const handleAddImage = () => {
    if (imageUrl.trim() && !images.includes(imageUrl)) {
      setImages([...images, imageUrl]);
      setImageUrl('');
      // Clear the image error if it exists
      if (formErrors.images) {
        const { images, ...rest } = formErrors;
        setFormErrors(rest);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <button className="back-button" onClick={onCancel}>
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>
        <h1 className="add-product-title">Add New Product</h1>
      </div>
      
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="title">Product Title *</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={formErrors.title ? 'form-input error' : 'form-input'}
              />
              {formErrors.title && <div className="error-message">{formErrors.title}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={formErrors.description ? 'form-input error' : 'form-input'}
              ></textarea>
              {formErrors.description && <div className="error-message">{formErrors.description}</div>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={formErrors.price ? 'form-input error' : 'form-input'}
                />
                {formErrors.price && <div className="error-message">{formErrors.price}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="stock">Stock Quantity *</label>
                <input
                  type="text"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={formErrors.stock ? 'form-input error' : 'form-input'}
                />
                {formErrors.stock && <div className="error-message">{formErrors.stock}</div>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={formErrors.category ? 'form-input error' : 'form-input'}
                >
                  <option value="" disabled>Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                {formErrors.category && <div className="error-message">{formErrors.category}</div>}
              </div>
              
              <div className="form-group">
                <label>Product Status</label>
                <div className="status-toggle">
                  <button
                    type="button"
                    className={`status-button ${status === 'active' ? 'active' : ''}`}
                    onClick={() => setStatus('active')}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    className={`status-button ${status === 'inactive' ? 'inactive' : ''}`}
                    onClick={() => setStatus('inactive')}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-column">
            <div className="form-group">
              <label>Product Images *</label>
              <div className="image-input-group">
                <input
                  type="url"
                  placeholder="Enter image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="form-input"
                />
                <button
                  type="button"
                  className="add-image-button"
                  onClick={handleAddImage}
                >
                  <Plus size={20} />
                </button>
              </div>
              
              {formErrors.images && <div className="error-message">{formErrors.images}</div>}
              
              <div className="image-preview-container">
                {images.length > 0 ? (
                  <div className="image-grid">
                    {images.map((img, index) => (
                      <div key={index} className="image-preview">
                        <img src={img} alt={`Product ${index + 1}`} />
                        <button
                          type="button"
                          className="remove-image-button"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-images">
                    <ImageIcon size={48} />
                    <p>No images added yet</p>
                    <p className="help-text">Add at least one product image</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;