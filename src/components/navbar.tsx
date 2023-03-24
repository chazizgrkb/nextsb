import Button from './button'

export default function Navbar() {
	return (
		<>
			<nav className="w-full bg-slate-50 border-b border-solid border-gray-200 p-3 z-50 backdrop-blur-sm">
				<div className="flex flex-auto gap-6">
					<a href="/">
					<img src="/qobo.svg" className="flex flex-none items-center w-24" alt="Qobo"></img>
					</a>
					<div className="flex flex-auto items-center">
						<input type="text" className="placeholder:text-slate-400 p-1 bg-white border border-slate-300 rounded-md focus:border-pink-300 outline-none focus:ring-1 focus:ring-pink-300" placeholder="Search"></input>
					</div>
					<div className="flex items-center">
						<Button link="/login">Login</Button>
					</div>
				</div>
			</nav>
		</>
	)
}