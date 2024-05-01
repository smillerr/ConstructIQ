'use client'
import credentialsSchema from '@/lib/Validators/user-login'
import ConstructIQLogo from '@/ui/common/ConstructIQLogo'
import { UserIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../common/Forms/ErrorMessage'
import { errorInputClasses } from '@/lib/utils/commonStyles'
import { useRouter } from 'next/navigation'
import { handleUserLogin } from '@/lib/utils/utilFunctions'
import { Alert } from '@mui/material'
import { useState } from 'react'
const UserLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(credentialsSchema) })
  const router = useRouter()
  const [error, setError] = useState('')
  return (
    <form
      onSubmit={handleSubmit((data) =>
        handleUserLogin(data, router.push, setError),
      )}
      className="w-full max-w-md"
    >
      <ConstructIQLogo isLogin />
      <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl ">
        Sign in
      </h1>
      <div className="relative flex items-center mt-8">
        <span className="absolute">
          <UserIcon className="w-6 h-6 mx-3 stroke-gray-300" />
        </span>
        <input
          type="text"
          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  ${errors.username?.message ? errorInputClasses : 'focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'}`}
          placeholder="Username"
          {...register('username')}
        />
      </div>
      <ErrorMessage message={errors.username?.message} />
      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
        <input
          type="password"
          className={`block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  ${errors.password?.message ? errorInputClasses : 'focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'} `}
          placeholder="Password"
          {...register('password')}
        />
      </div>
      <ErrorMessage message={errors.password?.message} />
      {error && (
        <Alert variant="filled" severity="error" className="mt-4">
          {error}
        </Alert>
      )}
      <div className="mt-6">
        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          Sign in
        </button>
      </div>
    </form>
  )
}

export default UserLoginForm
