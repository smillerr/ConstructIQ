import TaskForm from '@/ui/tareas/TaskForm'

export default async function CrearTarea(props) {
  return (
    <>
      <h1 className="text-3xl mb-6 text-gray-500">Nueva Tarea</h1>
      <TaskForm
        relatedId={props.searchParams.cid}
        relatedName={props.searchParams.cname}
      />
    </>
  )
}
