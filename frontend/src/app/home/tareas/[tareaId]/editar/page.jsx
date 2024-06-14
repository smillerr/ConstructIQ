import EditTaskForm from '@/ui/tareas/EditTaskForm'

export default async function EditTask(props) {
  console.log('tarea id', props.params.tareaId)
  return (
    <>
      <h1 className="text-3xl mb-6 text-gray-500">Editar Tarea</h1>
      <EditTaskForm
        taskId={props.params.tareaId}
        relatedId={props.searchParams.cid}
        relatedName={props.searchParams.cname}
      />
    </>
  )
}
