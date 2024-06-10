'use client'
import { listUser, listUsersByRole } from '@/lib/utils/utilFunctions'
import userSchema from '@/lib/Validators/create-user'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ErrorMessage from '../common/Forms/ErrorMessage'
import { errorInputClasses } from '@/lib/utils/commonStyles'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material'

export default function CreateUserForm() {
  const schema = userSchema
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const [fetchError] = useState('')

  const handleCreateObrasForm = (data) => {
    console.log(data)
  }

  const [directores, setDirectores] = useState([])
  const [capataces, setCapataces] = useState([])
  const [trabajadores, setTrabajadores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const allUsers = await listUser()
        const directoresData = await listUsersByRole(
          allUsers,
          'Director de obra',
        )
        setDirectores(directoresData)

        const capatacesData = await listUsersByRole(allUsers, 'Capataz de obra')
        setCapataces(capatacesData)

        const peonesData = await listUsersByRole(allUsers, 'Peón')
        const ayudantesAlbañilData = await listUsersByRole(
          allUsers,
          'Ayudante de albañil',
        )
        const trabajadoresData = [...peonesData, ...ayudantesAlbañilData]
        setTrabajadores(trabajadoresData)

        setLoading(false)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    fetchData()
  }, [])

  const [selectedTrabajadores, setSelectedTrabajadores] = useState([])

  const handleChangeTrabajadores = (event, onChange) => {
    const value = event.target.value
    onChange(value)
    setSelectedTrabajadores(value)
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
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="trabajadores-label">Trabajadores</InputLabel>
            <Controller
              control={control}
              name="personal"
              render={({ field: { onChange } }) => (
                <Select
                  labelId="trabajadores-label"
                  id="trabajadores-select"
                  multiple
                  value={selectedTrabajadores}
                  onChange={(e) => handleChangeTrabajadores(e, onChange)}
                  input={<OutlinedInput label="Trabajadores" />}
                  renderValue={(selected) => (
                    <div>
                      {selected
                        .map((value) => {
                          const trabajador = trabajadores.find(
                            (t) => t.id === value,
                          )
                          return trabajador ? trabajador.nombre : ''
                        })
                        .join(', ')}
                    </div>
                  )}
                >
                  {trabajadores.map((trabajador) => (
                    <MenuItem key={trabajador.id} value={trabajador.id}>
                      {trabajador.nombre}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
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

              <section className="bg-white">
                {loading ? (
                  <div>Cargando...</div>
                ) : (
                  <div>
                    {/* Resto del contenido */}
                    <select
                      {...register('id_director')}
                      className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${errors.id_director?.message || errors.id_capataz?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                    >
                      <option value="">Seleccione un director</option>
                      {directores.map((director) => (
                        <option key={director.id} value={director.id}>
                          {director.nombre}
                        </option>
                      ))}
                    </select>

                    <select
                      {...register('id_capataz')}
                      className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${errors.id_director?.message || errors.id_capataz?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                    >
                      <option value="">Seleccione un capataz</option>
                      {capataces.map((capataz) => (
                        <option key={capataz.id} value={capataz.id}>
                          {capataz.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </section>
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
