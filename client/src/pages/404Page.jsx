import React from 'react'
import { Link } from "react-router-dom"
import { ArrowLeft } from "react-feather"

import Button from "@/components/Button"

export default function NotFoundPage() {
	return (
		<main className="flex flex-col h-screen justify-center text-center space-y-5 bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 p-4">
			<h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-zinc-200">Page Not Found</h1>
			<p className="text-xl sm:text-2xl tracking-wide">The product / page you are looking for is currently not available.</p>
			<Link to="/">
				<Button link className="text-base sm:text-xl">
					<ArrowLeft className="mr-2" /> Back to Home
				</Button>
			</Link>
		</main>
	)
}