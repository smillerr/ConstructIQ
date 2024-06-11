'use client'
import {
  createConstruction,
  listUser,
  listUsersByRole,
  uploadConstructionImage,
} from '@/lib/utils/utilFunctions'
import obraSchema from '@/lib/Validators/create-obras'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ErrorMessage from '../common/Forms/ErrorMessage'
import { errorInputClasses } from '@/lib/utils/commonStyles'
import React, { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material'
import AutocompleteLocation from './AutocompleteLocation'
import { useRouter } from 'next/navigation'

export default function CreateObrasForm() {
  const schema = obraSchema
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const router = useRouter()

  const handleCreateObrasForm = async (data) => {
    const personal = data.personal
    const img_obra = data.img_obra[0]

    const formatted_inicio =
      data.fecha_inicio.getFullYear() +
      '-' +
      (data.fecha_inicio.getMonth() + 1) +
      '-' +
      data.fecha_inicio.getDate()
    const formatted_final =
      data.fecha_final.getFullYear() +
      '-' +
      (data.fecha_final.getMonth() + 1) +
      '-' +
      data.fecha_final.getDate()
    delete data.fecha_inicio
    delete data.fecha_final
    delete data.personal
    delete data.img_obra
    const obraData = {
      ...data,
      obra_personal: {
        personal: personal,
      },
      fecha_inicio: formatted_inicio,
      fecha_final: formatted_final,
    }
    const createdObra = await createConstruction(obraData)
    if (createdObra) {
      await uploadConstructionImage(createdObra.id, img_obra)
      router.push(`/home/obras`)
    }
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

  const [selectedCapataces, setSelectedCapataces] = useState([])

  const handleChangeCapataces = (event, onChange) => {
    const value = event.target.value
    onChange(value)
    setSelectedCapataces(value)
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
          <section className="w-full grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="fecha_inicio"
                className="text-gray-700 font-semibold mb-2"
              >
                Fecha Inicio
              </label>
              <div className="relative flex items-center mt-2">
                <input
                  id="fecha_inicio"
                  type="date"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${
                    errors.fecha_inicio?.message
                      ? errorInputClasses
                      : `focus:border-blue-400 focus:ring-blue-300`
                  } focus:outline-none focus:ring focus:ring-opacity-40`}
                  {...register('fecha_inicio')}
                />
              </div>
              <ErrorMessage message={errors.fecha_inicio?.message} />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="fecha_final"
                className="text-gray-700 font-semibold mb-2"
              >
                Fecha Final
              </label>
              <div className="relative flex items-center mt-2">
                <input
                  id="fecha_final"
                  type="date"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${
                    errors.fecha_final?.message
                      ? errorInputClasses
                      : `focus:border-blue-400 focus:ring-blue-300`
                  } focus:outline-none focus:ring focus:ring-opacity-40`}
                  {...register('fecha_final')}
                />
              </div>
              <ErrorMessage message={errors.fecha_final?.message} />
            </div>

            <FormControl sx={{ width: '100%' }}>
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

            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="capataces-label">Capataces</InputLabel>
              <Controller
                control={control}
                name="id_capataces"
                render={({ field: { onChange } }) => (
                  <Select
                    labelId="capataces-label"
                    id="capataces-select"
                    multiple
                    value={selectedCapataces}
                    onChange={(e) => handleChangeCapataces(e, onChange)}
                    input={<OutlinedInput label="Capataces" />}
                    renderValue={(selected) => (
                      <div>
                        {selected
                          .map((value) => {
                            const capataz = capataces.find(
                              (c) => c.id === value,
                            )
                            return capataz ? capataz.nombre : ''
                          })
                          .join(', ')}
                      </div>
                    )}
                  >
                    {capataces.map((capataz) => (
                      <MenuItem key={capataz.id} value={capataz.id}>
                        {capataz.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <div className="flex flex-col">
              <div className="relative mt-4">
                <input
                  type="text"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${
                    errors.nombre?.message
                      ? errorInputClasses
                      : `focus:border-blue-400 focus:ring-blue-300`
                  } focus:outline-none focus:ring focus:ring-opacity-40`}
                  placeholder="Nombre"
                  {...register('nombre')}
                />
                <ErrorMessage message={errors.nombre?.message} />
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <select
                {...register('estado')}
                className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${
                  errors.estado?.message
                    ? errorInputClasses
                    : `focus:border-blue-400 focus:ring-blue-300`
                } focus:outline-none focus:ring focus:ring-opacity-40`}
              >
                <option value="">Estado</option>
                <option value="nueva">Nueva</option>
                <option value="en_desarrollo">En desarrollo</option>
                <option value="en_revision">En revisión</option>
                <option value="culminada">Culminada</option>
              </select>
              <ErrorMessage message={errors.estado?.message} />
            </div>

            <div className="flex flex-col">
              <textarea
                className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${errors.descripcion?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                placeholder="Descripción"
                {...register('descripcion')}
              ></textarea>
              <ErrorMessage message={errors.descripcion?.message} />
            </div>

            <div className="w-full flex flex-col justify-center mt-4 md:mt-0">
              <section className="bg-white">
                {loading ? (
                  <div>Cargando...</div>
                ) : (
                  <div>
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
                    <ErrorMessage message={errors.id_director?.message} />
                  </div>
                )}
              </section>
            </div>

            <div className="relative flex items-center mt-4">
              <AutocompleteLocation register={register} setValue={setValue} />

              <ErrorMessage message={errors.ubicacion?.message} />
            </div>
            <div className="w-full flex flex-col justify-center mt-4 md:mt-0">
              <select
                className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${errors.tipo_obra?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                {...register('tipo_obra')}
              >
                <option value="">Selecciona el tipo de obra</option>
                <option value="escuela">Escuela</option>
                <option value="colegio">Colegio</option>
                <option value="conjunto residencial">
                  Conjunto residencial
                </option>
                <option value="torre de apartamentos">
                  Torre de apartamentos
                </option>
                <option value="vial">Vial</option>
                <option value="edificio">Edificio</option>
                <option value="tienda">Tienda</option>
                <option value="casa">Casa</option>
                <option value="hospital">Hospital</option>
                <option value="fabrica">Fábrica</option>
                <option value="otros">Otros</option>
              </select>

              <ErrorMessage message={errors.tipo_obra?.message} />
            </div>
          </section>

          <div className="mt-4">
            <div className="relative flex items-center">
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
                  className=""
                  {...register('img_obra')}
                />
                <p className="text-sm text-gray-500">
                  El archivo no puede tener tildes ni caracteres especiales
                </p>
              </label>
            </div>
          </div>

          {/* Resto del formulario */}
          <section className="w-full md:grid md:grid-cols-2 md:gap-4 flex flex-col items-center justify-center">
            <div className="w-full flex flex-col"></div>
          </section>
          <div className="mt-4">
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
