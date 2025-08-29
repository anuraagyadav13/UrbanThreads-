const router = require("express").Router()
const { celebrate } = require('celebrate')

const Product = require("../models/Product.model")
const { product: productSchema } = require('../models/schema_fixed')
const { 
	verifyToken,
	verifyAuthorization,
	verifyAdminAccess,
} = require('../middlewares/verifyAuth')


// Get all products - any user
router.get("/", 
	celebrate({ query: productSchema.query }),
	async (req, res) => {
	const query = req.query
	try {
		let productsQuery = Product.find()

		// Handle category filter if present
		if (query.category) {
			productsQuery = productsQuery.where('categories').in([query.category])
		}

		// Handle new arrivals if requested
		if (query.new === 'true') {
			productsQuery = productsQuery.sort({ createdAt: -1 }).limit(5)
		}

		const products = await productsQuery.exec()
		return res.json(products)

	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

// Add a new product - admin only
router.post("/", 
	verifyAdminAccess, 
	celebrate({ body: productSchema.new }),
	async (req, res) => {

	try {
		await Product.create(req.body)
		return res.json(productResponse.productAdded)

	} catch (err) {
		console.log(err)
		return res.status(500).json(productResponse.unexpectedErrorS)
	}
})

// Update a product - admin only
router.put("/:id",
  verifyAdminAccess, 
	celebrate({ body: productSchema.update }),
  async (req, res) => {
	try {
		await Product.findByIdAndUpdate(
			req.params.id,
			{$set: req.body },
			{new: true},
		)
		return res.json(productResponse.productUpdated)
		
	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

// Delete a product - admin only
router.delete("/:id", verifyAdminAccess, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id)
		res.json(productResponse.productDeleted)

	} catch (err) {
		console.log(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

// Get any product - any user
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		return res.json(product)

	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

const productResponse = {
	productAdded: { 
		status: "ok",
		message: "product has been added",
	},	
	productUpdated: { 
		status: "ok",
		message: "product has been updated",
	},
	productDeleted: { 
		status: "ok",
		message: "product has been deleted",
	},
	unexpectedError: {
		status: "error",
		message: "an unexpected error occurred",
	},
}

module.exports = router