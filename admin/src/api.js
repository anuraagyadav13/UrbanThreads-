const API_URL = import.meta.env.VITE_API_URL

function setAccessToken(token) {
  localStorage.setItem('admin_token', token)
}

function getAccessToken() {
  return localStorage.getItem('admin_token')
}

function setAdmin(admin) {
  localStorage.setItem('admin_user', JSON.stringify(admin))
}

function getAdmin() {
  const admin = localStorage.getItem('admin_user')
  return admin ? JSON.parse(admin) : null
}

async function loginAdmin({email, password}) {
  const resp = await fetch(API_URL+"/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password}),
  })
  const data = await resp.json()

  console.log('Login response:', data) // Debug log

  if (data.accessToken && data.status === 'ok') {
    // Login successful, now fetch user details
    const userResp = await fetch(API_URL+"/users/me", {
      headers: {
        "x-access-token": data.accessToken,
      }
    })
    const userData = await userResp.json()
    
    console.log('User data:', userData) // Debug log
    
    if (userData.status === 'ok' && userData.user && userData.user.isAdmin) {
      setAccessToken(data.accessToken)
      setAdmin(userData.user)
      return { status: "ok", user: userData.user }
    } else {
      return { status: "error", message: "Access denied. Admin privileges required." }
    }
  }
  return { status: "error", message: data.message || "Invalid credentials" }
}

function logoutAdmin() {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
}

async function fetchProducts() {
  const resp = await fetch(API_URL+"/products")
  return await resp.json()
}

async function fetchProduct(id) {
  const resp = await fetch(API_URL+"/products/"+id)
  return await resp.json()
}

async function createProduct(productData) {
  const resp = await fetch(API_URL+"/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getAccessToken(),
    },
    body: JSON.stringify(productData),
  })
  return await resp.json()
}

async function updateProduct(id, productData) {
  const resp = await fetch(API_URL+"/products/"+id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": getAccessToken(),
    },
    body: JSON.stringify(productData),
  })
  return await resp.json()
}

async function deleteProduct(id) {
  const resp = await fetch(API_URL+"/products/"+id, {
    method: "DELETE",
    headers: {
      "x-access-token": getAccessToken(),
    },
  })
  return await resp.json()
}

export default {
  loginAdmin,
  logoutAdmin,
  getAdmin,
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
