import { PlusIcon } from '@heroicons/react/24/outline'
import TaskRow from '../tareas/TaskRow'
const tareas = [
  {
    id: 1,
    name: 'Tarea 1',
    status: 'En progreso',
    cid: 5,
    cname: 'Colegio Campestre',
  },
  {
    id: 2,
    name: 'Tarea 2',
    status: 'En progreso',
    cid: 7,
    cname: 'Puente peatonal',
  },
  {
    id: 3,
    name: 'Tarea 3',
    status: 'En progreso',
    cid: 4,
    cname: 'Casa de la cultura',
  },
]
const TasksSection = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold ">Tasks</h2>
        <button className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded ">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      {tareas?.map((tarea) => (
        <TaskRow
          key={tarea.id}
          id={tarea.id}
          name={tarea.name}
          status={tarea.status}
          constructionId={tarea.cid}
          constructionName={tarea.cname}
        />
      ))}
    </div>
  )
}

export default TasksSection
