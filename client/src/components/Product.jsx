import React from 'react'
import { Link } from "react-router-dom"
import { ShoppingCart, Search, Check } from "react-feather"
import clsx from "clsx"

import Card from "./Card"

export default function Product({ link, imgSrc, price, onAddToCart, isInCart }) {
	return (
		<Card 
			imgSrc={imgSrc} 
			className={clsx(
				"!max-w-80 !max-h-96",
				"rounded-2xl m-3",
			)}
		>
			<div className={clsx(
      	"absolute inset-0 text-black text-center",
      	"flex flex-col justify-center items-center",
      	"opacity-0 transition-all duration-300 ease-out",
      	"group-hover:(opacity-100 bg-black/30 backdrop-blur-sm)"
    	)}>
    			{isInCart ? (
						<Link to="/cart">
							<ProductButton className="!bg-green-500 text-white">
								<Check className='min-w-8' />
							</ProductButton>
						</Link>
					):( 
						<ProductButton onClick={onAddToCart}>
							<ShoppingCart className='min-w-8' />
						</ProductButton>
					)}
    		<Link to={link}>
	    		<ProductButton>
	    			<Search className='min-w-8' />
	    		</ProductButton>
    		</Link>
      </div>
    	<div className={clsx(
    		"absolute bottom-0 right-0 w-10 h-10 m-4",
    		"flex justify-center items-center",
    		"bg-black/50 font-bold text-white rounded-full",
    	)}>
    		${price}
    	</div>
		</Card>
	)
}

function ProductButton({ children, className, ...props }) {
	return (
		<button className={`m-4 bg-white/90 hover:bg-white w-14 h-14 flex justify-center items-center rounded-full transition-all duration-300 ease-out hover:(scale-110 shadow-xl) focus:outline-none ${className}`} {...props}>
			{children}
		</button>
	)
}