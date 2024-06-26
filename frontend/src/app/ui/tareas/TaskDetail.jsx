'use client'
import { badgeTaskStatusColor } from '@/lib/utils/commonStyles'
import { getAdvancements, getTask } from '@/lib/utils/utilFunctions'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Avatar, AvatarGroup } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DeleteTaskModal from './DeleteTaskModal'
import { useRouter } from 'next/navigation'
import AvancesSection from '../avances/AvancesSection'

const TaskDetail = ({ taskId, constructionId, constructionName, userType }) => {
  const router = useRouter()
  const [task, setTask] = useState(null)
  const [avances, setAvances] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState(false)
  const canDelete = userType === 'Director de obra'
  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getTask(taskId)
      const advancements = await getAdvancements(taskId)
      const filteredAdvancements = advancements?.filter(
        (avance) => avance.id_task === parseInt(taskId),
      )
      setTask(taskData)
      setAvances(filteredAdvancements)
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
          {avances?.length > 0 ? (
            <AvancesSection
              taskList={avances}
              relatedConstruction={task.descripcion}
              relatedId={taskId}
            />
          ) : (
            <div className="flex justify-between items-center">
              <h2 className="text-gray-600 font-bold ">
                No hay avances para esta tarea
              </h2>
              <button className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded ">
                <Link
                  href={{
                    pathname: '/home/crear-avance',
                    query: {
                      cid: taskId,
                      cname: task.descripcion,
                    },
                  }}
                >
                  <PlusIcon className="h-5 w-5" />
                </Link>
              </button>
            </div>
          )}

          <div className="flex justify-end mt-6 space-x-2">
            <Link
              href={{
                pathname: `/home/tareas/${taskId}/editar`,
                query: {
                  cid: constructionId,
                  cname: constructionName,
                },
              }}
              className="bg-gray-200 text-black text-sm px-2 py-1 rounded"
            >
              <PencilIcon className="h-5 w-5" />
            </Link>
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 rounded"
              onClick={() => setDeleteModal(true)}
              disabled={!canDelete}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-4 bg-white p-6 rounded shadow flex-1">
          <p className="font-bold">Cargando informacion de la tarea...</p>
        </div>
      )}
      {deleteModal && (
        <DeleteTaskModal
          open={deleteModal}
          setOpen={setDeleteModal}
          taskId={taskId}
          relatedConstruction={constructionId}
          routingCallback={router.replace}
        />
      )}
    </div>
  )
}

export default TaskDetail
