'use client'
import { badgeTaskStatusColor } from '@/lib/utils/commonStyles'
import { getTask } from '@/lib/utils/utilFunctions'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Avatar, AvatarGroup } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const TaskDetail = ({ taskId, constructionId, constructionName }) => {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getTask(taskId)
      setTask(taskData)
      setLoading(false)
    }
    fetchTask()
  }, [])
  console.log(taskId)
  return (
    <div className="flex flex-col md:flex-row">
      {!loading ? (
        <div className="max-w-5xl mx-4 bg-white p-6 rounded shadow flex-1">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            {task?.descripcion}
          </h1>
          <p className="text-gray-600 mb-4">{task?.tipo_tarea}</p>
          <p className="text-gray-600 mb-4">
            Esta tarea pertenece a la obra:{' '}
            <Link
              href={`/home/obras/${constructionId}`}
              className="text-blue-600"
            >
              {constructionName}
            </Link>
          </p>
          <div className="flex items-center mt-4">
            <button
              className={`${badgeTaskStatusColor(task?.estado)} text-sm px-2 py-1 rounded`}
            >
              {task?.estado}
            </button>
          </div>
          <div className="flex items-center justify-between mt-4 mb-6">
            <p className="text-gray-600">Fecha de inicio</p>
            <p className="text-gray-600">{task?.fecha_asignacion}</p>
          </div>
          <div className="flex items-center justify-between mt-4 mb-6">
            <p className="text-gray-600">Fecha estimada de entrega</p>
            <p className="text-gray-600">{task?.fecha_estimada_fin}</p>
          </div>
          <div className="flex items-center justify-between mt-4 mb-6">
            <div>
              <p className="text-gray-600 mb-4">Personal asignado</p>
              <AvatarGroup max={4}>
                {task?.personal_asignado?.map((trabajador) => (
                  <Avatar
                    key={trabajador.id}
                    alt={trabajador.nombre}
                    src={trabajador.foto_perfil}
                  />
                ))}
              </AvatarGroup>
            </div>
            <div>
              <p className="text-gray-600 mb-4">Capataz encargado</p>
              <Avatar
                alt={task?.capataz_encargado.nombre}
                src={task?.capataz_encargado.foto_perfil}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button className="bg-gray-200 text-black text-sm px-2 py-1 rounded">
              <PencilIcon className="h-5 w-5" />
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 rounded">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-4 bg-white p-6 rounded shadow flex-1">
          <p className="font-bold">Cargando informacion de la tarea...</p>
        </div>
      )}
    </div>
  )
}

export default TaskDetail
