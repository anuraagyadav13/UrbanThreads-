import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, LogOut, X } from 'react-feather'
import Button from './Button'
import Container from './Container'
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
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 shadow-sm border-b border-gray-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:(from-white to-slate-300) bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-zinc-400 mt-1">Welcome back, {admin.fullname}</p>
            </div>
            <Button secondary onClick={onLogout}>
              <LogOut size={16} className="mr-2" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex justify-between items-center">
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <X size={16} />
            </button>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex justify-between items-center">
            <p className="text-green-700 dark:text-green-400">{success}</p>
            <button onClick={() => setSuccess('')} className="text-green-500 hover:text-green-700">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-700">
          <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Products Management</h2>
              <Button onClick={handleAddProduct}>
                <Plus size={16} className="mr-2" /> Add Product
              </Button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white mx-auto"></div>
                <p className="text-gray-600 dark:text-zinc-400 mt-4">Loading products...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-zinc-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Image</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Categories</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b border-gray-100 dark:border-zinc-700/50 hover:bg-gray-50 dark:hover:bg-zinc-700/30">
                        <td className="py-4 px-4">
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="w-12 h-14 object-cover rounded-lg"
                          />
                        </td>
                        <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">{product.title}</td>
                        <td className="py-4 px-4 text-gray-700 dark:text-zinc-300">{formatPrice(product.price)}</td>
                        <td className="py-4 px-4 text-gray-700 dark:text-zinc-300">{product.categories?.join(', ')}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.inStock 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditProduct(product)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product._id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-700 flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button 
                onClick={() => setShowForm(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <ProductForm 
                product={editingProduct}
                onSuccess={handleFormSuccess}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
