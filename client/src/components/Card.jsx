import React from 'react'
import clsx from "clsx"

export default function Card({ imgSrc, children, className }) {
	return (
		<div className={clsx(
			"max-w-72 relative overflow-hidden group",
			"bg-white dark:bg-slate-900",
			"rounded-2xl border border-slate-200/50 dark:border-slate-800/50",
			"shadow-lg hover:shadow-2xl",
			"transition-all duration-300 ease-out",
			"hover:(-translate-y-1)",
			className,
		)}
		>
		  <img 
		  	className={clsx(
		  		"object-cover w-full h-full",
		  		"transition duration-500 ease-out transform",
		  		"group-hover:(scale-110)",
		  	)} 
		  	src={imgSrc} 
		  	alt="" 
		  	referrerPolicy="no-referrer"
		  	loading="lazy"
		  	onError={(e) => { if (e.currentTarget.dataset.fallbackApplied) return; e.currentTarget.dataset.fallbackApplied = '1'; e.currentTarget.src = 'https://picsum.photos/seed/fallback-card/800/1000'; }}
		  />
	  	{children}
		</div>
	)
}