require('dotenv').config()
const mongoose = require('mongoose')

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...')
    
    // Set up connection events
    mongoose.connection.on('connecting', () => {
      console.log('Connecting to MongoDB...')
    })
    
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB successfully!')
    })
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err)
    })

    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })

    // Get all collection names
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log('\n=== Database Collections ===')
    collections.forEach((collection, index) => {
      console.log(`${index + 1}. ${collection.name}`)
    })
    
    console.log('\n=== Connection Details ===')
    console.log('Host:', mongoose.connection.host)
    console.log('Port:', mongoose.connection.port)
    console.log('Database:', mongoose.connection.name)
    
    // Close the connection
    await mongoose.connection.close()
    console.log('\nConnection closed.')
    
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

testConnection()
