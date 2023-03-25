import Button from './button'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useSession, signIn, signOut } from "next-auth/react"
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'

const links = [
	{ href: '/account-settings', label: 'Account settings' },
	{ href: '/api/auth/signout', label: 'Sign out' },
]

function NavbarMenu() {
	const { data: session, status } = useSession()
	return (
		<Menu as="div" className="relative inline-block text-left h-8">
			<Menu.Button className="inline-flex w-full justify-center">
				<img src={ session?.user?.image } className="w-8 rounded-full" alt={ session?.user?.name }></img>
			</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
			<Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
				<Menu.Item
					as="a"
					href={"/user/" + session?.user?.name}
					className="menu-item p-2 flex items-center gap-3">
					<div>
						<img src={ session?.user?.image } className="w-12 rounded-full" alt={ session?.user?.name }></img>
					</div>
					<div className="flex-auto">
						<p className="font-semibold">{ session?.user?.name }</p>
						<p className="text-gray-500 text-sm">{ session?.user?.email }</p>
					</div>
				</Menu.Item>
				{links.map((link) => (
					<Menu.Item
						as="a"
						key={link.href}
						href={link.href}
						className="menu-item block rounded text-sm"
					>
						{link.label}
					</Menu.Item>
				))}
			</Menu.Items>
			</Transition>
		</Menu>
	)
}

function NavbarUser() {
	const { data: session, status } = useSession()
	const userEmail = session?.user?.email

	if (status === "authenticated") {
		return (
			<>
				<div className="flex items-center gap-2">
					<a href="/upload"><ArrowUpTrayIcon className="h-6 w-6"/></a>
					<NavbarMenu/>
				</div>
			</>
		)
	}

	return (
		<>
			<div className="flex items-center">
				<Button link="/api/auth/signin">Sign in</Button>
			</div>
		</>
	)
}

export default function Navbar() {
	return (
		<>
			<nav className="w-full bg-gray-50 border-b border-solid border-gray-200 p-3 z-50 backdrop-blur-sm">
				<div className="flex flex-auto gap-6">
					<div className="flex items-center gap-5">
					<a href="/">
						<img src="/qobo.svg" className="flex flex-none items-center w-24" alt="Qobo"></img>
					</a>
						<a href="/posts">Posts</a>
						<a href="/community">Community</a>
					</div>
					<div className="flex flex-auto">
						<input type="text" className="input-text" placeholder="Search"></input>
					</div>
					<div className="flex items-center gap-5">
						<NavbarUser></NavbarUser>
					</div>
				</div>
			</nav>
		</>
	)
}