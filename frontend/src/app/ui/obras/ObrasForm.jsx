'use client'
import userSchema from '@/lib/Validators/create-user'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ErrorMessage from '../common/Forms/ErrorMessage'
import { errorInputClasses } from '@/lib/utils/commonStyles'
import { useState } from 'react'
import { Alert } from '@mui/material'

const ObrasForm = () => {
  const schema = userSchema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const [fetchError] = useState('')

  const handleCreateObrasForm = (data) => {
    console.log(data)
  }

  return (
    <section className="bg-white">
      <div className="container flex-grow justify-center min-h-screen px-6 mx-auto">
        <form
          className="h-full"
          onSubmit={handleSubmit(
            (data) => {
              handleCreateObrasForm(data)
            },
            (err) => console.log(err),
          )}
        >
          <section className="w-full md:grid md:grid-cols-2 md:gap-4 flex flex-col items-center justify-center">
            <div className="w-full flex flex-col">
              <div className="relative flex items-center mt-4">
                <input
                  type="text"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.nombre?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder="Nombre"
                  {...register('nombre')}
                />
              </div>
              <ErrorMessage message={errors.nombre?.message} />
              <div className="relative flex items-center mt-4">
                <input
                  type="text"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.descripcion?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder="Descripción"
                  {...register('descripcion')}
                />
              </div>
              <div className="relative flex items-center mt-4">
                <input
                  type="text"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.ubicacion?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder="Ubicación"
                  {...register('ubicacion')}
                />
              </div>
              <ErrorMessage message={errors.ubicacion?.message} />
              <div className="relative flex items-center mt-4">
                <input
                  type="text"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.tipo_obra?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder="Tipo de obra"
                  {...register('tipo_obra')}
                />
              </div>
              <ErrorMessage message={errors.tipo_obra?.message} />
            </div>

            <div className="w-full flex flex-col justify-center mt-4 md:mt-0">
              <div className="relative flex items-center">
                <select
                  {...register('estado')}
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${errors.estado?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                >
                  <option value="">Estado</option>
                  <option value="nueva">Nueva</option>
                  <option value="en_desarrollo">En desarrollo</option>
                  <option value="en_revision">En revisión</option>
                  <option value="culminada">Culminada</option>
                </select>
              </div>
              <ErrorMessage message={errors.estado?.message} />

              <div className="relative flex items-center mt-4">
                <select
                  {...register('id_director')}
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${errors.id_director?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                >
                  <option value="">Director</option>
                  <option value="1">Director 1</option>
                  <option value="2">Director 2</option>
                  <option value="3">Director 3</option>
                </select>
              </div>
              <ErrorMessage message={errors.id_director?.message} />

              <div className="relative flex items-center mt-4">
                <select
                  {...register('id_capataz')}
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${errors.id_capataz?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                >
                  <option value="">Capataz</option>
                  <option value="1">Capataz 1</option>
                  <option value="2">Capataz 2</option>
                  <option value="3">Capataz 3</option>
                </select>
              </div>
              <ErrorMessage message={errors.id_capataz?.message} />
            </div>
          </section>
          <div className="mt-4">
            <ErrorMessage message={errors.direccion?.message} />
            {fetchError && (
              <Alert variant="filled" severity="error" className="mt-4">
                {fetchError}
              </Alert>
            )}
            <button
              className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              type="submit"
            >
              Crear obra
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ObrasForm
