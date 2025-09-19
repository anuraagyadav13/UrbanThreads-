const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	images: [{
		type: String,
		required: true,
	}],
	price: { 
		type: Number,
		required: true,
	},
	inStock: {
		type: Boolean,
		default: true,
	},
	categories: { type: Array },
	sizes: { type: Array },
	colors: { type: Array },
},  
	{timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema)