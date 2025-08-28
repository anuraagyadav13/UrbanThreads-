import React from 'react'
import clsx from "clsx"

export default function Input({ icon, className, ...props}) {
	const input = 
		<input 
			type="text" 
			className={clsx(
				"w-full min-w-56 bg-gray-50/80 border border-gray-300/60 text-gray-900 rounded-xl p-3", 
				"dark:(bg-zinc-800/50 border-zinc-600/50 text-zinc-100)",
				"focus:(outline-none ring-2 ring-blue-500/50 border-blue-500/50)",
				"dark:focus:(ring-blue-400/50 border-blue-400/50)",
				"transition-all duration-200",
				icon && "pl-10",
				props.disabled && "!text-gray-600 !bg-gray-200",
				className,
			)}
			{...props}
		/>

	if (icon) {
		return (
		<div className="w-full flex items-center relative mx-0 md:mx-3">
		  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-600 dark:text-zinc-400">
		    {icon}
		  </div>
		  {input}
		</div>
		)
	} else {
		return input
	}
}