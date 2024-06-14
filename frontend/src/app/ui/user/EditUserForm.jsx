'use client'
import userSchema from '@/lib/Validators/edit-user'
import { errorInputClasses } from '@/lib/utils/commonStyles'
import { getUser, handleEditUserForm } from '@/lib/utils/utilFunctions'
import { LockClosedIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../common/Forms/ErrorMessage'
import { Alert } from '@mui/material'
import { getSessionAction } from '@/lib/utils/actions'
const EditUserForm = ({ userId }) => {
  const schema = userSchema
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const populateForm = (userData) => {
    Object.keys(userData).forEach((key) => {
      setValue(key, userData[key])
    })
  }
  const router = useRouter()
  const [fetchError, setFetchError] = useState('')
  const [tipoUsuario, setTipoUsuario] = useState('')
  const [isLoginEditable, setIsLoginEditable] = useState(null)
  const tipoUsuarioRef = useRef()

  useEffect(() => {
    async function getUserData() {
      const userData = await getUser(userId)
      const session = await getSessionAction()
      if (
        userData?.tipo_usuario === 'Gerente' ||
        session?.user?.tipo_usuario !== 'Gerente'
      ) {
        router.replace('/home/usuarios')
      }
      console.log(userData)
      populateForm(userData)
      setTipoUsuario(userData.tipo_usuario)
      if (
        userData.tipo_usuario !== 'Ayudante de albañil' ||
        userData.tipo_usuario !== 'Peón'
      ) {
        setIsLoginEditable(false)
      }
    }
    getUserData()
  }, [])
  return (
    <section className="bg-white">
      <div className="container flex-grow justify-center min-h-screen px-6 mx-auto">
        <form
          className="h-full"
          onSubmit={handleSubmit((data) => {
            handleEditUserForm(data, router.push, setFetchError)
          })}
        >
          <section className="w-full md:grid md:grid-cols-2 md:gap-4 flex flex-col items-center justify-center">
            <div className="w-full">
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
                <h2 className="mx-3 text-gray-400">Profile Photo</h2>
                <input
                  id="dropzone-file"
                  type="file"
                  {...register('foto_perfil')}
                />
              </label>
              {/*NOMBRE Y APELLIDO */}
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.nombre?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder="Nombre"
                  {...register('nombre')}
                />
              </div>
              <ErrorMessage message={errors.nombre?.message} />
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.apellido?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder="Apellido"
                  {...register('apellido')}
                />
              </div>
              <ErrorMessage message={errors.apellido?.message} />
              {/* SELECCIONE TIPO */}
              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  {/*  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>*/}
                </span>
                <select
                  {...register('tipo_identificacion')}
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.tipo_identificacion?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                >
                  <option value="">Tipo de identificacion</option>
                  <option value="TI">Tarjeta de identidad</option>
                  <option value="Cedula">Cédula Nacional</option>
                </select>
              </div>
              <ErrorMessage message={errors.tipo_identificacion?.message} />
              {/* NUMERO DE IDENTIFICACION */}
              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 19a2 2 0 01-2 2H5a2 2 0 01-2-2M19 19a2 2 0 01-2 2h-2a2 2 0 01-2-2"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.numero_identificacion?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder="Número de identificación"
                  {...register('numero_identificacion')}
                />
              </div>
              <ErrorMessage message={errors.numero_identificacion?.message} />
            </div>
            <div className="w-full">
              <div className="relative flex items-center justify-between mt-4 md:mt-0">
                <select
                  {...register('tipo_usuario')}
                  ref={tipoUsuarioRef}
                  onChange={() => {
                    setTipoUsuario(tipoUsuarioRef.current.value)
                    setValue('tipo_usuario', tipoUsuarioRef.current.value)
                    if (
                      tipoUsuarioRef.current.value === 'Ayudante de albañil' ||
                      tipoUsuarioRef.current.value === 'Peón'
                    ) {
                      setValue('login', 'N/A')
                      setValue('password', 'N/A')
                      return
                    }
                    setValue('login', '')
                    setValue('password', '')
                    setIsLoginEditable(true)
                  }}
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.tipo_usuario?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                  value={tipoUsuario}
                >
                  <option value="">Tipo de Usuario</option>
                  <option value="Director de obra">Director</option>
                  <option value="Capataz de obra">Capataz</option>
                  <option value="Ayudante de albañil">Ayudante</option>
                  <option value="Peón">{'Peón'}</option>
                </select>
              </div>
              <ErrorMessage message={errors.tipo_usuario?.message} />

              <div className="relative flex items-center mt-4">
                <span className="absolute"></span>
                <select
                  {...register('genero')}
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.genero?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                >
                  <option value="">Genero</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
              <ErrorMessage message={errors.genero?.message} />
              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.celular?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder="Celular"
                  {...register('celular')}
                />
              </div>
              <ErrorMessage message={errors.celular?.message} />
              {(tipoUsuario === 'Director de obra' ||
                tipoUsuario === 'Capataz de obra' ||
                tipoUsuario === '') && (
                <>
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.login?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                      placeholder="Login"
                      {...register('login')}
                      readOnly={
                        (tipoUsuario === 'Director de obra' ||
                          tipoUsuario === 'Capataz de obra') &&
                        !isLoginEditable
                      }
                    />
                  </div>
                  <ErrorMessage message={errors.login?.message} />
                  {(tipoUsuario === 'Director de obra' ||
                    tipoUsuario === 'Capataz de obra' ||
                    tipoUsuario === '') && (
                    <>
                      <div className="relative flex items-center mt-4">
                        <span className="absolute">
                          <LockClosedIcon className="w-6 h-6 mx-3 text-gray-300" />
                        </span>
                        <input
                          type="text"
                          className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.password?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                          placeholder="password"
                          {...register('password')}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </section>
          <div className="mt-4">
            <div className="relative flex items-center">
              <span className="absolute">
                <MapPinIcon className="w-6 h-6 mx-3 text-gray-300" />
              </span>
              <input
                type="text"
                className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.direccion?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                placeholder="Direccion"
                {...register('direccion')}
              />
            </div>
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
              Editar usuario
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EditUserForm
