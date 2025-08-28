import React, { useContext, useState } from 'react'
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Menu, Search, User, LogIn, X, ShoppingCart, Moon, Sun } from "react-feather"

import { UserContext, CartContext } from '@/App'
import Button from "@/components/Button"
import Input from "@/components/Input"
import UserDropDown from '@/components/UserDropDown'
import api from "@/api"
import useClickOutside from '@/hooks/useClickOutside'

export default function Navbar() {
	const {user, setUser} = useContext(UserContext)
	const {cart, cartDispatch} = useContext(CartContext)
	const [showMenu, setShowMenu] = useState(false)
	const navbarRef = useClickOutside(() => setShowMenu(false))

	return (
		<nav className={clsx(
			"w-full flex flex-wrap justify-between items-center",
			"sticky top-0 z-40 py-3 px-4",
			"bg-white/95 dark:bg-slate-950/95",
			"border-b border-gray-200/60 dark:border-slate-800/60",
			"backdrop-blur-xl shadow-sm",
			"md:(py-1)"
		)} ref={navbarRef}>
			<div className="flex justify-between items-center md:mx-0">
				<Link to="/">
					<h3 className="font-display font-semibold text-3xl text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-200">Urban Threads</h3>
				</Link>
			</div>

			<div className="flex items-center ml-2 space-x-4 md:order-2">
				<Link to="/cart" className="relative flex items-center pr-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
					<ShoppingCart width={24} height={24} />
					{cart.products.length ?
						<div className='absolute flex justify-center items-center w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full -top-1 -right-1 text-xs font-medium shadow-lg'>
							{cart.products.length}
						</div>
						: null
					}
				</Link>
				<ThemeToggle />
				{user && 
					<UserDropDown 
						user={user} 
						onLogout={() => {
							api.logoutUser()
							setUser(null)
							cartDispatch({type: "RESET"})
						}} 
					/>
				}
				<button className="md:hidden flex items-center focus:outline-none">
					{showMenu 
						? <X width={24} height={24} onClick={() => setShowMenu(false)} />
						:	<Menu width={24} height={24} onClick={() => setShowMenu(true)} />
					}
				</button>
			</div>

			<div className={clsx(
				"hidden w-full",
				showMenu && "!flex flex-col mt-8",
				"md:(flex flex-row mt-0 ml-auto order-1 w-auto)"
			)}>
				<ul className={clsx(
					"flex flex-col items-center order-2",
					"mt-8 mb-2 text-lg space-y-2 font-medium",
					"md:(flex-row text-base m-0 space-y-0 space-x-8)"
				)} onClick={() => setShowMenu(false)}>
					<NavLink to="/products?category=men">Men</NavLink>
					<NavLink to="/products?category=women">Women</NavLink>
					<NavLink to="/products">All Products</NavLink>
				</ul>
				<div className="flex items-center order-1 md:order-2">
					<Input 
						className="md:max-w-min bg-opacity-40" 
						icon={<Search />} 
						placeholder="Search..." 
					/>
				</div>
			{!user && (
				<ul className={clsx(
					"flex flex-col order-3",
					showMenu && "mt-4",
					"md:(flex-row text-base mt-0 space-x-2)"
				)}>
					<li>
						<Link to="/login">
							<Button secondary className="w-full md:w-auto">
								<LogIn width={20} height={20} className="mr-2" />Login
							</Button>
						</Link>
					</li>
					<li>
						<Link to="/register">
							<Button className="w-full md:w-auto">
								<User width={20} height={20} className="mr-2" />Register
							</Button>
						</Link>
					</li>
				</ul>
			)}
			</div>
		</nav>
	)
}

function NavLink({ children, to }) {
	return (
		<li className="relative group">
			<Link 
				to={to} 
				className="text-slate-700 hover:text-slate-900 dark:(text-slate-200 hover:text-white) px-4 py-2 rounded-lg transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium"
			>
				{children}
			</Link>
		</li>
	)
}

function ThemeToggle() {
    const [isDark, setIsDark] = React.useState(() => document.documentElement.classList.contains('dark'))
    return (
        <button
            aria-label="Toggle dark mode"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:(bg-slate-800 hover:bg-slate-700) border border-slate-200 dark:border-slate-700 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => {
                const next = !document.documentElement.classList.contains('dark')
                document.documentElement.classList.toggle('dark', next)
                localStorage.setItem('theme', next ? 'dark' : 'light')
                setIsDark(next)
            }}
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    )
}