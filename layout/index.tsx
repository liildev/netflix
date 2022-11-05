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
                <title>{title ? `${title} - Netflix` : 'Netflix'}</title>
                <meta name="google-site-verification" content="6qiEMoDqlbT475KWutakgNWa-eapCgPIbQFd3n_VTDM" />
                <link rel="icon" href="/netflix.webp" />
            </Head>
            {
                children
            }
        </>
    )
}
