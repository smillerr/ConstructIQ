'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { errorInputClasses } from '@/lib/utils/commonStyles'
import React, { useEffect } from 'react'
import { handleCreateAvance } from '@/lib/utils/utilFunctions'

const AvanceForm = ({ relatedId, relatedName }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setValue('id_task', parseInt(relatedId))
    }

    fetchData()
  }, [])

  return (
    <section className="bg-white">
      <div className="container flex-grow justify-center min-h-screen px-6 mx-auto">
        <form
          className="h-full"
          onSubmit={handleSubmit(
            (data) => {
              handleCreateAvance(data, relatedId, router.push)
            },
            (err) => console.log(err),
          )}
        >
          <section className="w-full grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex items-center px-3 py-3 mx-auto text-center bg-white border-2 border-dashed rounded-lg cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <h2 className="mx-3 text-gray-400">Foto avance</h2>
                <input
                  id="dropzone-file"
                  type="file"
                  className=""
                  {...register('img_avance')}
                />
              </label>
            </div>
            <div className="flex flex-col">
              <textarea
                className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${errors.descripcion?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                placeholder="Descripción"
                {...register('descripcion')}
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="tarea"
                className="text-gray-700 font-semibold mb-2"
              >
                Tarea Relacionada
              </label>
              <p>{relatedName}</p>
            </div>
            <div className="flex flex-col">
              <input
                className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${errors.descripcion?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                placeholder="Porcentaje tarea"
                type="number"
                {...register('tarea_porcentaje')}
              ></input>
            </div>
            <div className="flex flex-col">
              <input
                className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${errors.descripcion?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                placeholder="Necesidades"
                type="text"
                {...register('necesidades')}
              ></input>
            </div>
          </section>

          <button
            className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            type="submit"
          >
            Crear Tarea
          </button>
        </form>
      </div>
    </section>
  )
}

export default AvanceForm
