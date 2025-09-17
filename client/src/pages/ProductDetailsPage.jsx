
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { Check, ChevronLeft, ShoppingCart } from "react-feather"

import Button from "@/components/Button"
import Loader from "@/components/Loader"
import api from '../api'
import { CartContext, UserContext } from '@/App'

export default function ProductDetailsPage() {
	const {user} = useContext(UserContext)
	const {cart, cartDispatch} = useContext(CartContext)
	const navigate = useNavigate()
	const { id } = useParams()
	const [product, setProduct] = useState(null)

	useEffect(() => {
		(async () => {
			const resp = await api.fetchProduct(id)
			if (resp.status == "error") {
				return navigate("/404")
			}
			setProduct(resp)
		})()
	}, [id])

  const addToCart = async (e, quantity=1) => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }
    
    // Only proceed if user is logged in
    const resp = await api.addProductsToCart([{productID: id, quantity}]);
    if (resp.status === "ok") {
      cartDispatch({type: "ADD_PRODUCTS", payload: [{...product, quantity}]});
    }
  }

	if (!product) return <Loader /> 

	return (
		<main className="relative mb-20 min-h-screen">
			<div className="container mx-auto px-6 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<section className="relative group">
						<div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-2xl">
							<img 
								className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
								src={product.image} 
								alt={product.title}
							/>
						</div>
					</section>
					<section className="space-y-8">
						<div className="space-y-4">
							<h1 className="font-display text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:(from-white to-slate-300) bg-clip-text text-transparent leading-tight">{product.title}</h1>
							<p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">{product.description}</p>
						</div>
						<div className="flex items-center space-x-4">
							<span className="text-4xl font-bold text-slate-900 dark:text-white">₹{product.price}</span>
							<span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">In Stock</span>
						</div>
						<div className="flex flex-col sm:flex-row gap-4">
							{cart.products.some(p => p.id === id) ? (
								<Link to="/cart" className="flex-1">
									<Button className="w-full py-4 text-lg bg-green-600 hover:bg-green-700 dark:(bg-green-500 hover:bg-green-600)">
										<Check className="mr-3" size={20} />
										<span>View in Cart</span>
									</Button>
								</Link>
							) : (
								<Button className="flex-1 py-4 text-lg" onClick={addToCart}>
									<ShoppingCart className="mr-3" size={20} />
									<span>Add to Cart</span>
								</Button>
							)}
							<Button light className="px-8 py-4 text-lg">
								♡ Save
							</Button>
						</div>
					</section>
				</div>
			</div>
			<Button 
				onClick={() => navigate(-1)}
				className="fixed top-24 left-6 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl" 
				light
			>
				<ChevronLeft className="mr-2" size={18} /> Back
			</Button>
		</main>
	)
}