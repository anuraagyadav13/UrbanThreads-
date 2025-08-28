import React from 'react'
import clsx from "clsx"

export default function DropDown({ children, className, ...props }) {
	return (
		<div 
		className={clsx(
				"absolute top-0 z-50",
				"bg-white text-sm list-none",
				"divide-y divide-gray-100",
				"rounded shadow-lg my-2",
				"dark:(bg-zinc-800 divide-zinc-700)",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)

}
export function Select({ children, className, ...props }) {
	return (
		<ul 
			className={`py-1 ${className}`}
			{...props}
		>
			{children}
		</ul>
	)
}

export function Option({ children, className, ...props }) {
	return (
		<li 
			className={`hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200 block px-4 py-2 truncate cursor-pointer ${className}`}
			{...props}
		>
			{children}
		</li>
	)
}