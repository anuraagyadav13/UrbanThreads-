import React from 'react'
import clsx from "clsx"

export default function Button({ className, children, link, secondary, light, ...props}) {
	return (
    <button 
      className={clsx(
        "inline-flex items-center justify-center px-6 py-3 m-1",
        "bg-slate-900 text-white text-sm font-semibold",
        "rounded-xl shadow-lg",
        "transition-all duration-200",
        "hover:(bg-slate-800 shadow-xl -translate-y-0.5)",
        "focus:(ring-4 ring-slate-300/50)",
        "focus:outline-none",
        "active:translate-y-0",
        (secondary || link) && "!bg-transparent !shadow-none",
        link && "!text-blue-800 hover:!text-blue-900 dark:!text-blue-400 dark:hover:!text-blue-300",
        (secondary || light) && "!text-slate-800 dark:!text-slate-200",
        "dark:(bg-white text-slate-900 hover:bg-slate-50 shadow-xl)",
        light && "!bg-white !hover:bg-slate-50 dark:!bg-slate-800 dark:!text-slate-100 dark:hover:!bg-slate-700 !border !border-slate-200 dark:!border-slate-700",
        props.disabled && "opacity-75 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>

	)
}