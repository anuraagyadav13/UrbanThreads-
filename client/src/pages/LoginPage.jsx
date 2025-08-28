import React, { useContext } from 'react'
import { sliderItems } from '@/dummydata'

import { UserContext, CartContext } from '@/App'
import LoginForm from "@/ui/LoginForm"
import api from '@/api'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
	const {cart} = useContext(CartContext)
	const {setUser} = useContext(UserContext)
	const navigate = useNavigate()

	const handleLogin = async userData => {
		const resp = await api.loginUser(userData)
		if (resp.status == "ok") {
			if (cart.products.length) {
				await api.addProductsToCart(cart.products.map(p => ({
					productID: p.id,
					quantity: p.quantity
				})))
			}
			setUser(api.getUser())
			if (cart.products.length) {
				navigate("/cart")
			} else {
				navigate("/account")
			}
		}
		return resp
	}
	const randomSlide = sliderItems[Math.floor(Math.random() * sliderItems.length)]

	return (
		<main 
			className="flex justify-center h-screen items-center bg-cover bg-center sm:bg-left"
			style={{backgroundImage: `url(${randomSlide.image})`}}
		>
			<div className="min-w-sm p-8 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 shadow-2xl dark:shadow-zinc-900/50">
				<h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Welcome Back</h3>
				<p className="text-center text-gray-600 dark:text-zinc-400 mb-6">Sign in to your account</p>
				<LoginForm onSubmit={handleLogin} />
			</div>
		</main>
	)
}