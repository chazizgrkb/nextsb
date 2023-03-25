import Head from "next/head"
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }: any) {
	return (
		<>
			<Head>
				<title>Qobo</title>
				<meta name="description" content="Qobo prototype" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<Navbar />
			</header>
			<main className="container mx-auto mt-2">
				{children}
			</main>
			<footer>
				<Footer />
			</footer>
		</>
	)
}