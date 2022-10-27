import Head from 'next/head'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import { CheckIcon } from '@heroicons/react/outline'
import { Product } from '@stripe/firestore-stripe-payments'
import { useState } from 'react'
import { loadCheckout } from '../libs/stripe'
import Table from './Table'
import Loader from './Loader'

interface Props {
    products: Product[]
}

export default function Plans({ products }: Props) {
    const { logout, user } = useAuth()
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])
    const [isBillingLoading, setBillingLoading] = useState(false)

    const subscribeToPlan = () => {
        if (!user) return

        loadCheckout(selectedPlan?.prices[0].id!)
        setBillingLoading(true)
    }

    return (
        <div>
            <Head>
                <title>
                    Netflix
                </title>
                <link rel="icon" href="/netflix.webp" />
            </Head>

            <header className="border-b border-white/10 bg-[#141414]">
                <Link href="/">
                    <img
                        src="/logo.svg"
                        alt="Netflix"
                        className="cursor-pointer object-contain w-[100px] sm:w-[120px]"
                    />
                </Link>
                <button
                    className="sm:text-lg text-sm font-medium hover:underline"
                    onClick={logout}
                >
                    Sign Out
                </button>
            </header>

            <main className='mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10'>
                <h1 className='text-3xl mb-3 font-medium'>
                    Choose the plan that's right for you
                </h1>

                <ul>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
                        Ad-free.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
                        just for you.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
                        your plan anytime.
                    </li>
                </ul>

                <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex w-full items-center self-end md:w-3/5">
                        {products.map((product) => (
                            <div
                                className={`planBox ${selectedPlan?.id === product.id ? 'opacity-100 planBoxActive' : 'opacity-60'
                                    }`}
                                key={product.id}
                                onClick={() => setSelectedPlan(product)}
                            >
                                <p className='text-sm sm:text-lg'>{product.name}</p>
                            </div>
                        ))}
                    </div>
                    <Table products={products} selectedPlan={selectedPlan} />
                    <button
                        disabled={!selectedPlan || isBillingLoading}
                        className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] cursor-pointer ${isBillingLoading && 'opacity-60'
                            }`}
                        onClick={subscribeToPlan}
                    >
                        {isBillingLoading ? (
                            <Loader color="dark:fill-gray-300" />
                        ) : (
                            'Subscribe'
                        )}
                    </button>
                </div>


            </main>
        </div>
    )
}
