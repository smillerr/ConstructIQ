'use client'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const TaskDetail = ({ taskId, constructionId, constructionName }) => {
  console.log(taskId)
  return (
    <div className="flex flex-col md:flex-row">
      <div className="max-w-5xl mx-4 bg-white p-6 rounded shadow flex-1">
        <h1 className="text-2xl font-bold text-blue-600">Nombre</h1>
        <p className="text-gray-600">Tipo de tarea</p>
        <p className="text-gray-600">
          Esta tarea pertenece a{' '}
          <Link
            href={`/home/obras/${constructionId}`}
            className="text-blue-600"
          >
            {constructionName}
          </Link>
        </p>
        <div className="flex items-center mt-2">
          <button className="bg-orange-100 text-orange-600 text-sm px-2 py-1 rounded">
            Estado <i className="fas fa-times" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <p className="text-gray-600">Fecha de inicio</p>
          <p className="text-gray-600">12 Apr 2024 08:31</p>
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <p className="text-gray-600">Fecha de entrega</p>
          <p className="text-gray-600">26 Apr 2024 08:31</p>
        </div>
        <p className="mb-6 text-gray-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          minima totam, ut in cupiditate ad eum dolore consectetur officiis
          neque, optio sequi possimus numquam, veritatis quaerat natus
          voluptates hic velit.
        </p>

        <div className="flex justify-end mt-6 space-x-2">
          <button className="bg-gray-200 text-black text-sm px-2 py-1 rounded">
            <PencilIcon className="h-5 w-5" />
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 rounded">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetail
