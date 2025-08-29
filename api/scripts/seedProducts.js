const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const Product = require('../models/Product.model')

async function connectToDatabase() {
  const dbUrl = process.env.DB_URL
  if (!dbUrl) throw new Error('DB_URL is not set in environment')
  await mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
}

async function seedProducts() {
  const products = [
    { title: 'Men Classic Cotton Tee', description: 'Soft 100% cotton tee with a classic fit for everyday wear.', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop', price: 19.99, inStock: true, categories: ['men'], size: ['S','M','L','XL'], color: ['black','white','navy'] },
    { title: 'Women Leather Jacket', description: 'Premium faux-leather biker jacket with tailored silhouette.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop', price: 89.00, inStock: true, categories: ['women'], size: ['XS','S','M','L'], color: ['black','brown'] },
    { title: 'Unisex Fleece Hoodie', description: 'Cozy mid-weight fleece hoodie with kangaroo pocket.', image: 'https://images.unsplash.com/photo-1556821840-3a9fbc86339e?w=800&h=1000&fit=crop', price: 45.50, inStock: true, categories: ['men','women'], size: ['S','M','L','XL'], color: ['gray','black','blue'] },
    { title: 'Denim Slim Fit Jeans', description: 'Stretch denim jeans with slim fit and 5-pocket styling.', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop', price: 59.99, inStock: true, categories: ['men'], size: ['30','32','34','36'], color: ['indigo','black'] },
    { title: 'Summer Floral Dress', description: 'Lightweight A-line dress with floral print and V-neck.', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop', price: 49.00, inStock: true, categories: ['women'], size: ['XS','S','M','L'], color: ['yellow','red','blue'] },
    { title: 'Running Sneakers', description: 'Breathable mesh running shoes with responsive cushioning.', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=1000&fit=crop', price: 72.00, inStock: true, categories: ['men','women'], size: ['7','8','9','10','11'], color: ['white','black'] },
    { title: 'Men Oxford Shirt', description: 'Button-down oxford shirt with crisp finish.', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop', price: 39.00, inStock: true, categories: ['men'], size: ['S','M','L','XL'], color: ['blue','white'] },
    { title: 'Women High-Waist Jeans', description: 'High-rise skinny jeans with stretch comfort.', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop', price: 62.00, inStock: true, categories: ['women'], size: ['24','26','28','30'], color: ['dark','light'] },
    { title: 'Unisex Puffer Jacket', description: 'Lightweight insulated puffer for colder days.', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=1000&fit=crop', price: 99.00, inStock: true, categories: ['men','women'], size: ['S','M','L'], color: ['black','olive'] },
    { title: 'Men Chino Pants', description: 'Slim-straight chinos suitable for work and casual.', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop', price: 54.00, inStock: true, categories: ['men'], size: ['30','32','34','36'], color: ['khaki','navy'] },
    { title: 'Women Knit Sweater', description: 'Soft cable-knit sweater with crew neck.', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop', price: 58.00, inStock: true, categories: ['women'], size: ['XS','S','M','L'], color: ['cream','pink'] },
    { title: 'Unisex Graphic Tee', description: 'Ring-spun cotton tee with minimalist graphic.', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop', price: 22.00, inStock: true, categories: ['men','women'], size: ['S','M','L','XL'], color: ['white','black'] },
    { title: 'Men Linen Shirt', description: 'Breathable linen shirt ideal for summer.', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop', price: 44.00, inStock: true, categories: ['men'], size: ['S','M','L'], color: ['white','beige'] },
    { title: 'Women Midi Skirt', description: 'Flowy midi skirt with side slit.', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=800&h=1000&fit=crop', price: 41.00, inStock: true, categories: ['women'], size: ['XS','S','M','L'], color: ['black','red'] },
    { title: 'Unisex Track Jacket', description: 'Retro track jacket with contrast stripes.', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=1000&fit=crop', price: 65.00, inStock: true, categories: ['men','women'], size: ['S','M','L','XL'], color: ['navy','white'] },
    { title: 'Men Polo Shirt', description: 'Classic piqué polo with ribbed collar.', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=1000&fit=crop', price: 35.00, inStock: true, categories: ['men'], size: ['S','M','L','XL'], color: ['green','black'] },
    { title: 'Women Blouse', description: 'Light chiffon blouse with subtle pleats.', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop', price: 38.00, inStock: true, categories: ['women'], size: ['XS','S','M','L'], color: ['white','blue'] },
    { title: 'Unisex Baseball Cap', description: 'Adjustable cotton cap with curved brim.', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=1000&fit=crop', price: 15.00, inStock: true, categories: ['men','women'], size: [], color: ['black','navy'] }
  ]

  const ops = products.map(p => ({ updateOne: { filter: { title: p.title }, update: { $set: p }, upsert: true } }))
  const result = await Product.bulkWrite(ops)
  return result
}

;(async () => {
  try {
    await connectToDatabase()
    const res = await seedProducts()
    console.log('Seed completed:', JSON.stringify(res, null, 2))
    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error(err)
    await mongoose.disconnect().catch(() => {})
    process.exit(1)
  }
})()


