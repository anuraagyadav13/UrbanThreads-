import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Table, Modal, Alert } from 'react-bootstrap'
import { Plus, Edit, Trash2, LogOut } from 'react-feather'
import ProductForm from './ProductForm'
import api from '../api'

export default function Dashboard({ admin, onLogout }) {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await api.fetchProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const result = await api.deleteProduct(productId)
        if (result.status === 'ok') {
          setSuccess('Product deleted successfully')
          fetchProducts()
        } else {
          setError('Failed to delete product')
        }
      } catch (err) {
        setError('Failed to delete product')
      }
    }
  }

  const handleFormSuccess = () => {
    setSuccess(editingProduct ? 'Product updated successfully' : 'Product added successfully')
    setShowForm(false)
    setEditingProduct(null)
    fetchProducts()
  }

  const formatPrice = (price) => {
    return `₹${price.toFixed(2)}`
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Admin Dashboard</h1>
            <div>
              <span className="me-3">Welcome, {admin.fullname}</span>
              <Button variant="outline-danger" onClick={onLogout}>
                <LogOut size={16} className="me-1" /> Logout
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Products Management</h3>
                <Button variant="primary" onClick={handleAddProduct}>
                  <Plus size={16} className="me-1" /> Add Product
                </Button>
              </div>

              {loading ? (
                <div className="text-center">Loading products...</div>
              ) : (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Categories</th>
                      <th>In Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img 
                            src={product.image} 
                            alt={product.title}
                            style={{ width: '50px', height: '60px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>{product.title}</td>
                        <td>{formatPrice(product.price)}</td>
                        <td>{product.categories?.join(', ')}</td>
                        <td>
                          <span className={`badge ${product.inStock ? 'bg-success' : 'bg-danger'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm 
            product={editingProduct}
            onSuccess={handleFormSuccess}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  )
}
