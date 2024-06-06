'use client'
import { UserIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../common/Forms/ErrorMessage'
import { errorInputClasses } from '@/lib/utils/commonStyles'
import { Alert } from '@mui/material'
import { useState } from 'react'

const AddStaffForm = ({ submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [error, setError] = useState('')

  const onSubmit = (data) => {
    setError('')
    console.log(data)
    submitHandler()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">
        Añadir personal
      </h1>
      <div className="relative flex items-center mt-8">
        <span className="absolute">
          <UserIcon className="w-6 h-6 mx-3 stroke-gray-300" />
        </span>
        <input
          type="text"
          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${
            errors.username?.message
              ? errorInputClasses
              : 'focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
          }`}
          placeholder="Username"
          {...register('login')}
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
          className={`block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg ${
            errors.password?.message
              ? errorInputClasses
              : 'focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
          } `}
          placeholder="Password"
          {...register('password')}
        />
      </div>

      {error && (
        <Alert variant="filled" severity="error" className="mt-4">
          {error}
        </Alert>
      )}
      <div className="mt-6">
        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          Añadir
        </button>
      </div>
    </form>
  )
}

export default AddStaffForm
