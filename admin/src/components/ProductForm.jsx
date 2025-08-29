import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import api from '../api'

export default function ProductForm({ product, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    inStock: true,
    categories: [],
    size: [],
    color: []
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const categoryOptions = ['men', 'women', 'unisex']
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', '24', '26', '28', '30', '32', '34', '36', '7', '8', '9', '10', '11']
  const colorOptions = ['black', 'white', 'navy', 'brown', 'gray', 'blue', 'indigo', 'yellow', 'red', 'green', 'pink', 'cream', 'beige', 'khaki', 'olive', 'dark', 'light']

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        image: product.image || '',
        price: product.price || '',
        inStock: product.inStock !== undefined ? product.inStock : true,
        categories: product.categories || [],
        size: product.size || [],
        color: product.color || []
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      }

      const result = product 
        ? await api.updateProduct(product._id, productData)
        : await api.createProduct(productData)

      if (result.status === 'ok') {
        onSuccess()
      } else {
        setError(result.message || 'Failed to save product')
      }
    } catch (err) {
      setError('Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Product Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Price (₹) *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Description *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL *</Form.Label>
        <Form.Control
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
        {formData.image && (
          <div className="mt-2">
            <img 
              src={formData.image} 
              alt="Preview" 
              style={{ width: '100px', height: '120px', objectFit: 'cover' }}
            />
          </div>
        )}
      </Form.Group>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Categories *</Form.Label>
            {categoryOptions.map(category => (
              <Form.Check
                key={category}
                type="checkbox"
                label={category.charAt(0).toUpperCase() + category.slice(1)}
                checked={formData.categories.includes(category)}
                onChange={() => handleArrayChange('categories', category)}
              />
            ))}
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Sizes</Form.Label>
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {sizeOptions.map(size => (
                <Form.Check
                  key={size}
                  type="checkbox"
                  label={size}
                  checked={formData.size.includes(size)}
                  onChange={() => handleArrayChange('size', size)}
                />
              ))}
            </div>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Colors</Form.Label>
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {colorOptions.map(color => (
                <Form.Check
                  key={color}
                  type="checkbox"
                  label={color.charAt(0).toUpperCase() + color.slice(1)}
                  checked={formData.color.includes(color)}
                  onChange={() => handleArrayChange('color', color)}
                />
              ))}
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="In Stock"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
        </Button>
      </div>
    </Form>
  )
}
