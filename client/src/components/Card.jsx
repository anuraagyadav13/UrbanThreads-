import React from 'react'
import clsx from "clsx"

export default function Card({ imgSrc, children, className }) {
	return (
		<div className={clsx(
			"max-w-72 relative overflow-hidden group",
			"bg-white dark:bg-zinc-900",
			"shadow-md",
			"hover:shadow-lg",
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