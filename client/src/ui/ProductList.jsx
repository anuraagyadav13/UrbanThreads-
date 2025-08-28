import React, { useContext } from 'react'

import Product from "@/components/Product"
import { CartContext } from "@/App"

export default function ProductList({ products, onAddToCart }) {
  const {cart} = useContext(CartContext)

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
			{products.map(product => (
				<Product
					key={product._id}
					imgSrc={product.image}
					price={product.price}
					link={`/products/${product._id}`}
					onAddToCart={() => onAddToCart(product)}
					isInCart={cart.products.some(p => p.id === product._id)}
				/>					
			))}
		</div>
	)
}