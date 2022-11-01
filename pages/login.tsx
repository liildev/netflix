import Image from 'next/image'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import useAuth from '../hooks/useAuth'
import MainLayout from '../layout'

interface Inputs {
  email: string
  password: string
}

const toastStyle = {
  background: 'white',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '15px',
  borderRadius: '9999px',
  maxWidth: '1000px',
}

function Login() {
  const [login, setLogin] = useState(false)
  const { signIn, signUp, error } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      await signIn(data.email, data.password)

      toast(error, {
        duration: 4000,
        style: toastStyle,
      })
    } else {
      await signUp(data.email, data.password)
      toast(error, {
        duration: 4000,
        style: toastStyle,
      })
    }
  }


  return (
    <MainLayout>
      <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
        <Toaster position='bottom-center' />
        <Image
          src="/login.jpeg"
          layout="fill"
          className="-z-10 !hidden opacity-60 sm:!inline"
          objectFit="cover"
        />
        <img
          src="/logo.svg"
          className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
          width={150}
          height={150}
        />

        <form
          className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-4xl font-semibold">Sign In</h1>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                type="email"
                placeholder="Email"
                className={`input ${errors.email && 'border-b-2 border-orange-500'
                  }`}
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Please enter a valid email.
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <input
                type="password"
                {...register('password', { required: true })}
                placeholder="Password"
                className={`input ${errors.password && 'border-b-2 border-orange-500'
                  }`}
              />
              {errors.password && (
                <p className="p-1 text-[13px] font-light  text-orange-500">
                  Your password must contain between 4 and 60 characters.
                </p>
              )}
            </label>
          </div>
          <button
            className="w-full rounded bg-[#E50914] py-3 font-semibold"
            onClick={() => setLogin(true)}
            type="submit"
          >
            Sign In
          </button>
          <div className="text-[gray]">
            New to Netflix?{' '}
            <button
              className="cursor-pointer text-white hover:underline"
              onClick={() => setLogin(false)}
              type="submit"
            >
              Sign up now
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

export default Login
