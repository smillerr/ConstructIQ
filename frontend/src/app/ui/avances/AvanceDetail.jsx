'use client'
import { getAdvancement } from '@/lib/utils/utilFunctions'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ImageWithFallback from '../common/ImageWithFallback'

const AvanceDetail = ({
  taskId,
  constructionId,
  constructionName,
  userType,
}) => {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log(task)
  console.log(userType)
  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getAdvancement(taskId)
      setTask(taskData)
      setLoading(false)
    }
    fetchTask()
  }, [])
  return (
    <div className="flex flex-col md:flex-row">
      {!loading ? (
        <div className="max-w-5xl mx-4 bg-white p-6 rounded shadow flex-1">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">
            {task?.descripcion}
          </h1>
          <ImageWithFallback
            fallbackImage={'/default_advancement.jpg'}
            src={
              task?.img_avance ? task?.img_avance : '/default_advancement.jpg'
            }
            alt={task?.descripcion}
            width={490}
            height={290}
            className="h-72 object-cover"
          />
          <p className="text-gray-600 mb-4">
            Este avance pertenece a la tarea:{' '}
            <Link
              href={`/home/tareas/${constructionId}`}
              className="text-blue-600"
            >
              {constructionName}
            </Link>
          </p>
          <div className="flex items-center justify-between mt-4 mb-6">
            <p className="text-gray-600">Porcentaje de la tarea:</p>
            <p className="text-gray-600">{task?.tarea_porcentaje} %</p>
          </div>
          <div className="flex items-center justify-between mt-4 mb-6">
            <p className="text-gray-600">Necesidad de realizar avance:</p>
            <p className="text-gray-600">{task?.necesidades}</p>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-4 bg-white p-6 rounded shadow flex-1">
          <p className="font-bold">Cargando informacion del avance</p>
        </div>
      )}
    </div>
  )
}

export default AvanceDetail
