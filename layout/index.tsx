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
                <link rel="icon" href="/netflix.webp" />
            </Head>
            {
                children
            }
        </>
    )
}
