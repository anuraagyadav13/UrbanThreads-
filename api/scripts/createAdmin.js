const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()
const User = require('../models/User.model')

async function connectToDatabase() {
  const dbUrl = process.env.DB_URL
  if (!dbUrl) throw new Error('DB_URL is not set in environment')
  await mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
}

async function createAdmin() {
  const adminData = {
    fullname: 'Admin User',
    email: 'admin@urbanthreads.com',
    password: await bcrypt.hash('admin123', 10),
    isAdmin: true
  }

  const existingAdmin = await User.findOne({ email: adminData.email })
  if (existingAdmin) {
    // Update existing user to ensure isAdmin is set
    await User.findByIdAndUpdate(existingAdmin._id, { isAdmin: true })
    console.log('Admin user already exists - updated isAdmin flag')
    return existingAdmin
  }

  const admin = await User.create(adminData)
  console.log('Admin user created successfully')
  console.log('Admin details:', { email: admin.email, isAdmin: admin.isAdmin })
  return admin
}

;(async () => {
  try {
    await connectToDatabase()
    await createAdmin()
    console.log('Admin setup completed')
    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('Error creating admin:', err)
    await mongoose.disconnect().catch(() => {})
    process.exit(1)
  }
})()
