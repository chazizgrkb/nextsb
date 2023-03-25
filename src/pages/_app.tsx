import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { Inter } from 'next/font/google'
import '../styles/globals.scss'
import { SessionProvider } from "next-auth/react"

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }: any) {
    return (
        <SessionProvider session={session}>
            <div className={`${inter.variable} font-sans`}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </SessionProvider>
    )
}