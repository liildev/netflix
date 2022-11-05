import Head from 'next/head'
import React from 'react'

interface Props {
    title?: string;
    children: React.ReactNode
}

export default function MainLayout({ title, children }: Props) {
    return (
        <>
            <Head>
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content="next, javascript, react" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="google-site-verification" content="6qiEMoDqlbT475KWutakgNWa-eapCgPIbQFd3n_VTDM" />
                <link rel="icon" href="/netflix.webp" />
                <title>{title ? `${title} - Netflix` : 'Netflix'}</title>
            </Head>
            {
                children
            }
        </>
    )
}
