import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import '../styles/globals.scss'
import { SessionProvider } from "next-auth/react"

export default function App({
                                Component,
                                pageProps: { session, ...pageProps },
                            }: any) {
    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    )
}