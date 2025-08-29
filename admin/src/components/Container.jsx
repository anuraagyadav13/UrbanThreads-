import React from 'react'
import PageHeader from "./PageHeader"

export default function Container({ heading, children, type="section" }) {
	return (
		<section className="my-20 container mx-auto px-4">
			<PageHeader h2={type !== "page"}>
				{heading}
			</PageHeader>
			<div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-slate-600 dark:(from-slate-500 to-slate-300) mx-auto mt-4 mb-12 rounded-full" />
			{children}
		</section>
	)
}
