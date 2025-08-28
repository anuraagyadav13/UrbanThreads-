import React from 'react'

export default function PageHeader({ children, h2, h3, className }) {
	const commonClasses = `text-center font-display font-semibold text-balance ${className}`

	if (h2) {
		return <h2 className={`text-4xl md:text-5xl bg-gradient-to-r from-slate-900 to-slate-600 dark:(from-white to-slate-300) bg-clip-text text-transparent ${commonClasses}`}>{children}</h2>
	}	
	if (h3) {
		return <h3 className={`text-3xl md:text-4xl bg-gradient-to-r from-slate-900 to-slate-600 dark:(from-white to-slate-300) bg-clip-text text-transparent ${commonClasses}`}>{children}</h3>
	}

	return <h1 className={`text-5xl md:text-6xl bg-gradient-to-r from-slate-900 to-slate-600 dark:(from-white to-slate-300) bg-clip-text text-transparent ${commonClasses}`}>{children}</h1>
}