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
    { title: 'Men Classic Cotton Tee', description: 'Soft 100% cotton tee with a classic fit for everyday wear.', image: 'https://picsum.photos/seed/tee-men/800/1000', price: 19.99, inStock: true, categories: ['men'], size: ['S','M','L','XL'], color: ['black','white','navy'] },
    { title: 'Women Leather Jacket', description: 'Premium faux-leather biker jacket with tailored silhouette.', image: 'https://picsum.photos/seed/jacket-women/800/1000', price: 89.00, inStock: true, categories: ['women'], size: ['XS','S','M','L'], color: ['black','brown'] },
    { title: 'Unisex Fleece Hoodie', description: 'Cozy mid-weight fleece hoodie with kangaroo pocket.', image: 'https://picsum.photos/seed/hoodie-unisex/800/1000', price: 45.50, inStock: true, categories: ['men','women'], size: ['S','M','L','XL'], color: ['gray','black','blue'] },
    { title: 'Denim Slim Fit Jeans', description: 'Stretch denim jeans with slim fit and 5-pocket styling.', image: 'https://picsum.photos/seed/jeans-men/800/1000', price: 59.99, inStock: true, categories: ['men'], size: ['30','32','34','36'], color: ['indigo','black'] },
    { title: 'Summer Floral Dress', description: 'Lightweight A-line dress with floral print and V-neck.', image: 'https://picsum.photos/seed/dress-women/800/1000', price: 49.00, inStock: true, categories: ['women'], size: ['XS','S','M','L'], color: ['yellow','red','blue'] },
    { title: 'Running Sneakers', description: 'Breathable mesh running shoes with responsive cushioning.', image: 'https://picsum.photos/seed/sneaker/800/1000', price: 72.00, inStock: true, categories: ['men','women'], size: ['7','8','9','10','11'], color: ['white','black'] },
    { title: 'Men Oxford Shirt', description: 'Button-down oxford shirt with crisp finish.', image: 'https://picsum.photos/seed/oxford-men/800/1000', price: 39.00, inStock: true, categories: ['men'], size: ['S','M','L','XL'], color: ['blue','white'] },
    { title: 'Women High-Waist Jeans', description: 'High-rise skinny jeans with stretch comfort.', image: 'https://picsum.photos/seed/jeans-women/800/1000', price: 62.00, inStock: true, categories: ['women'], size: ['24','26','28','30'], color: ['dark','light'] },
    { title: 'Unisex Puffer Jacket', description: 'Lightweight insulated puffer for colder days.', image: 'https://picsum.photos/seed/puffer/800/1000', price: 99.00, inStock: true, categories: ['men','women'], size: ['S','M','L'], color: ['black','olive'] },
    { title: 'Men Chino Pants', description: 'Slim-straight chinos suitable for work and casual.', image: 'https://picsum.photos/seed/chino/800/1000', price: 54.00, inStock: true, categories: ['men'], size: ['30','32','34','36'], color: ['khaki','navy'] },
    { title: 'Women Knit Sweater', description: 'Soft cable-knit sweater with crew neck.', image: 'https://picsum.photos/seed/sweater/800/1000', price: 58.00, inStock: true, categories: ['women'], size: ['XS','S','M','L'], color: ['cream','pink'] },
    { title: 'Unisex Graphic Tee', description: 'Ring-spun cotton tee with minimalist graphic.', image: 'https://picsum.photos/seed/graphic-tee/800/1000', price: 22.00, inStock: true, categories: ['men','women'], size: ['S','M','L','XL'], color: ['white','black'] },
    { title: 'Men Linen Shirt', description: 'Breathable linen shirt ideal for summer.', image: 'https://picsum.photos/seed/linen/800/1000', price: 44.00, inStock: true, categories: ['men'], size: ['S','M','L'], color: ['white','beige'] },
    { title: 'Women Midi Skirt', description: 'Flowy midi skirt with side slit.', image: 'https://picsum.photos/seed/midi-skirt/800/1000', price: 41.00, inStock: true, categories: ['women'], size: ['XS','S','M','L'], color: ['black','red'] },
    { title: 'Unisex Track Jacket', description: 'Retro track jacket with contrast stripes.', image: 'https://picsum.photos/seed/track-jacket/800/1000', price: 65.00, inStock: true, categories: ['men','women'], size: ['S','M','L','XL'], color: ['navy','white'] },
    { title: 'Men Polo Shirt', description: 'Classic piqué polo with ribbed collar.', image: 'https://picsum.photos/seed/polo/800/1000', price: 35.00, inStock: true, categories: ['men'], size: ['S','M','L','XL'], color: ['green','black'] },
    { title: 'Women Blouse', description: 'Light chiffon blouse with subtle pleats.', image: 'https://picsum.photos/seed/blouse/800/1000', price: 38.00, inStock: true, categories: ['women'], size: ['XS','S','M','L'], color: ['white','blue'] },
    { title: 'Unisex Baseball Cap', description: 'Adjustable cotton cap with curved brim.', image: 'https://picsum.photos/seed/cap/800/1000', price: 15.00, inStock: true, categories: ['men','women'], size: [], color: ['black','navy'] }
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


