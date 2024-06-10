import { getSession } from '@/lib/utils/auth'
import TaskDetail from '@/ui/tareas/TaskDetail'
export default async function TaskPage(props) {
  const session = await getSession()
  console.log(session)
  return (
    <>
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl">Detalle de tarea</h1>
      </div>
      <TaskDetail
        taskId={props.params.tareaId}
        constructionId={props.searchParams.cid}
        constructionName={props.searchParams.cname}
      />
    </>
  )
}
