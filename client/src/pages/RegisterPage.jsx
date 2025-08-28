import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { sliderItems } from '@/dummydata'

import { UserContext, CartContext } from '@/App'
import RegisterForm from "@/ui/RegisterForm"
import api from '@/api'

export default function RegisterPage() {
	const {setUser} = useContext(UserContext)
	const {cart} = useContext(CartContext)
	const navigate = useNavigate()
	
	const handleRegister = async userData => {
		const resp = await api.registerUser(userData)
		if (resp.status == "ok") {
			const loginResp = await api.loginUser(userData)
			if (loginResp.status == "ok") {
				setUser(api.getUser())
				await api.createUserCart(cart.products.map(p => ({
					productID: p.id, 
					quantity: p.quantity
				})))

				if (cart.products.length) {
					navigate("/cart")
				} else {
					navigate("/account")
				}
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
				<h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Join Us</h3>
				<p className="text-center text-gray-600 dark:text-zinc-400 mb-6">Create your account</p>
				<RegisterForm onSubmit={handleRegister}/>
			</div>
		</main>
	)
}