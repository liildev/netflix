import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import payments, { goToBillingPortal } from '../libs/stripe'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { Membership } from '../components'

interface Props {
    products: Product[]
}

export default function Account({ products }: Props) {
    console.log(products)
    const { user, logout, loading } = useAuth()
    const subscription = useSubscription(user)
    // const [isBillingLoading, setBillingLoading] = useState(false)

    if (loading) return null

    return (
        <div>
            <Head>
                <title>Account Settings - Netflix</title>
                <link rel="icon" href="/netflix.webp" />
            </Head>
            <header className={`bg-[#141414]`}>
                <Link href="/">
                    <img
                        src="/logo.svg"
                        alt="Netflix"
                        className="cursor-pointer object-contain w-[100px] sm:w-[120px]"
                    />
                </Link>
                <Link href="/account">
                    <img
                        src="/account.png"
                        alt='Account'
                        className="cursor-pointer rounded"
                    />
                </Link>
            </header>
            <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
                <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
                    <h1 className="text-3xl md:text-4xl">Account</h1>
                    <div className="-ml-0.5 flex items-center gap-x-1.5">
                        <img
                            src="/member.svg"
                            alt="Membership"
                            className="h-7 w-7"
                        />

                        <p className="text-xs font-semibold text-[#555]">
                            Member since {subscription?.created}
                        </p>
                    </div>
                </div>

                <Membership />

                <div className="setAccount">
                    <h4 className="text-lg text-[gray]">Plan Details</h4>
                    {/* Find the current plan */}
                    <div className="col-span-2 font-medium">
                        {
                            products.filter(
                                (product) => product.id === subscription?.product
                            )[0]?.name
                        }
                    </div>
                    <p
                        className="cursor-pointer text-blue-500 hover:underline md:text-right"
                        onClick={goToBillingPortal}
                    >
                        Change plan
                    </p>
                </div>

                <div className="setAccount">
                    <h4 className="text-lg text-[gray]">Settings</h4>
                    <p
                        className="col-span-3 cursor-pointer text-blue-500 hover:underline"
                        onClick={logout}
                    >
                        Sign out of all devices
                    </p>
                </div>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const products = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
    })
        .then((res) => res)
        .catch((error) => console.log(error.message))

    return {
        props: {
            products,
        },
    }
}
