'use client'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ErrorMessage from '../common/Forms/ErrorMessage'
import { useRouter } from 'next/navigation'
import { errorInputClasses } from '@/lib/utils/commonStyles'
import {
  getTask,
  handleEditTask,
  listUser,
  listUsersByRole,
} from '@/lib/utils/utilFunctions'
import React, { useEffect, useState } from 'react'

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material'

import editTasksSchema from '@/lib/Validators/edit-tasks'

const EditTaskForm = ({ taskId, relatedId, relatedName }) => {
  const schema = editTasksSchema
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [capataces, setCapataces] = useState([])
  const [trabajadores, setTrabajadores] = useState([])

  useEffect(() => {
    const fetchFormData = async () => {
      const taskData = await getTask(taskId)
      setValue('fecha_estimada_fin', taskData.fecha_estimada_fin)
      setValue('estado', taskData.estado)
      setValue('descripcion', taskData.descripcion)
      setValue('capataz_encargado', taskData.capataz_encargado.id)
      setValue(
        'personal_asignado',
        taskData.personal_asignado.map((t) => t.id),
      )
      setSelectedTrabajadores(taskData.personal_asignado.map((t) => t.id))
      console.log(taskData)
    }
    const fetchData = async () => {
      try {
        const allUsers = await listUser()
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
      setValue('obra', parseInt(relatedId))
    }
    fetchFormData()
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
              handleEditTask(data, taskId, relatedId, router.push)
            },
            (err) => console.log(err),
          )}
        >
          <section className="w-full grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="fecha_estimada_fin"
                className="text-gray-700 font-semibold mb-2"
              >
                Fecha Estimada de Fin
              </label>
              <div className="relative flex items-center mt-2">
                <input
                  id="fecha_estimada_fin"
                  type="date"
                  className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${
                    errors.fecha_estimada_fin?.message
                      ? errorInputClasses
                      : `focus:border-blue-400 focus:ring-blue-300`
                  } focus:outline-none focus:ring focus:ring-opacity-40`}
                  {...register('fecha_estimada_fin')}
                />
              </div>
            </div>

            <div className="relative flex items-center mt-4">
              <select
                {...register('estado')}
                className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${errors.tipo_identificacion?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
              >
                <option value="">Estado</option>
                <option value="asignada">Asignada</option>
                <option value="en_desarrollo">En desarrollo</option>
                <option value="en_revision">En revision </option>
                <option value="aceptada">Aceptada</option>
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

            <div className="flex flex-col">
              <label
                htmlFor="obra"
                className="text-gray-700 font-semibold mb-2"
              >
                Obra relacionada
              </label>
              <p>{relatedName}</p>
            </div>

            <div className="w-full flex flex-col justify-center mt-4 md:mt-0">
              <section className="bg-white">
                {loading ? (
                  <div>Cargando capataz encargado...</div>
                ) : (
                  <div>
                    <select
                      {...register('capataz_encargado')}
                      className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${errors.capataz_encargado?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
                    >
                      <option value="">Seleccione un capataz</option>
                      {capataces.map((capataz) => (
                        <option key={capataz.id} value={capataz.id}>
                          {capataz.nombre}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage message={errors.capataz_encargado?.message} />
                  </div>
                )}
              </section>
            </div>

            {loading ? (
              <p>Cargando personal...</p>
            ) : (
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="trabajadores-label">Trabajadores</InputLabel>
                <Controller
                  control={control}
                  name="personal_asignado"
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
                <ErrorMessage message={errors.personal?.message} />
              </FormControl>
            )}
          </section>

          <button
            className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            type="submit"
          >
            Editar Tarea
          </button>
        </form>
      </div>
    </section>
  )
}

export default EditTaskForm
