import { PlusIcon } from '@heroicons/react/24/outline'
import TaskRow from '../tareas/TaskRow'
import Link from 'next/link'

const TasksSection = ({ taskList, relatedConstruction, relatedId }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold ">Tasks</h2>
        <button className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded ">
          <Link
            href={{
              pathname: '/home/crear-tarea',
              query: {
                cid: relatedId,
                cname: relatedConstruction,
              },
            }}
          >
            <PlusIcon className="h-5 w-5" />
          </Link>
        </button>
      </div>
      {taskList?.map((tarea) => (
        <TaskRow
          key={tarea.id}
          id={tarea.id}
          name={tarea.descripcion}
          status={tarea.estado}
          constructionId={relatedId}
          constructionName={relatedConstruction}
          personal={tarea.personal_asignado}
        />
      ))}
    </div>
  )
}

export default TasksSection
