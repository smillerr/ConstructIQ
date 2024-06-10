'use client'
import { useForm } from 'react-hook-form'
import SelectStaff from './SelectStaff'

const AddStaffForm = ({ submitHandler }) => {
  const { control, handleSubmit } = useForm()
  const onSubmit = (data) => {
    console.log(data)
    submitHandler(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">
        Añadir personal
      </h1>
      <SelectStaff control={control} />
      <div className="mt-6">
        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          Añadir
        </button>
      </div>
    </form>
  )
}

export default AddStaffForm
