import React from 'react'
import { Mail } from "react-feather"

import Input from "@/components/Input"
import Button from "@/components/Button"

export default function Newsletter() {
	return (
		<div className="max-w-3xl m-4 sm:mx-auto rounded-3xl text-center border border-slate-200 dark:border-slate-700 p-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:(from-slate-900 to-slate-800) shadow-2xl">
			<h2 className="font-display text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:(from-white to-slate-300) bg-clip-text text-transparent">Stay Updated</h2>
			<p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and fashion trends.</p>
			<form className="max-w-md flex flex-col sm:flex-row gap-4 mx-auto">
				<Input
					icon={<Mail />}
					type="email" 
					placeholder="Enter your email" 
					className="flex-1"
					required
				/>
				<Button type="submit" className="sm:w-auto w-full">Subscribe</Button>
			</form>
		</div>
	)
}