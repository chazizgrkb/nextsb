import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from "react";
import Layout from '../components/layout'

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}