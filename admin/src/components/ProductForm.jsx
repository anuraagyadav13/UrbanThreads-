import React, { useState, useEffect } from 'react'
import Button from './Button'
import Input from './Input'
import api from '../api'

export default function ProductForm({ product, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    categories: [],
    sizes: [],
    colors: [],
    inStock: true
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        image: product.image || '',
        categories: product.categories || [],
        sizes: product.sizes || [],
        colors: product.colors || [],
        inStock: product.inStock !== undefined ? product.inStock : true
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

  const handleArrayChange = (name, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item)
    setFormData(prev => ({
      ...prev,
      [name]: array
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price)
      }

      let result
      if (product) {
        result = await api.updateProduct(product._id, submitData)
      } else {
        result = await api.createProduct(submitData)
      }

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
            Product Title
          </label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
            Price (₹)
          </label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-zinc-400 transition-colors"
          placeholder="Enter product description..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
          Image URL
        </label>
        <Input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full"
          placeholder="https://example.com/image.jpg"
        />
        {formData.image && (
          <div className="mt-4">
            <img 
              src={formData.image} 
              alt="Preview" 
              className="w-24 h-28 object-cover rounded-lg border border-gray-200 dark:border-zinc-600"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
            Categories
          </label>
          <div className="space-y-2">
            {['men', 'women', 'kids', 'shirts', 'pants', 'dresses', 'shoes', 'accessories'].map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.categories.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...formData.categories, category]
                      : formData.categories.filter(c => c !== category)
                    setFormData(prev => ({ ...prev, categories: newCategories }))
                  }}
                  className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-zinc-300 capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
            Sizes
          </label>
          <div className="space-y-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.sizes.includes(size)}
                  onChange={(e) => {
                    const newSizes = e.target.checked
                      ? [...formData.sizes, size]
                      : formData.sizes.filter(s => s !== size)
                    setFormData(prev => ({ ...prev, sizes: newSizes }))
                  }}
                  className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-zinc-300">{size}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
            Colors
          </label>
          <div className="space-y-2">
            {['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple'].map(color => (
              <label key={color} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.colors.includes(color)}
                  onChange={(e) => {
                    const newColors = e.target.checked
                      ? [...formData.colors, color]
                      : formData.colors.filter(c => c !== color)
                    setFormData(prev => ({ ...prev, colors: newColors }))
                  }}
                  className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-zinc-300">{color}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-zinc-700 pt-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-3">
          Stock Status
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="inStock"
              value="true"
              checked={formData.inStock === true}
              onChange={() => setFormData(prev => ({ ...prev, inStock: true }))}
              className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 mr-2"
            />
            <span className="text-sm text-gray-700 dark:text-zinc-300">In Stock</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="inStock"
              value="false"
              checked={formData.inStock === false}
              onChange={() => setFormData(prev => ({ ...prev, inStock: false }))}
              className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 mr-2"
            />
            <span className="text-sm text-gray-700 dark:text-zinc-300">Out of Stock</span>
          </label>
        </div>
      </div>

      <div className="flex space-x-4 pt-4">
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
        </Button>
        <Button secondary onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  )
}
