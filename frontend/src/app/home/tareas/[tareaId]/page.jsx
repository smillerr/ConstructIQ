import { getSession } from '@/lib/utils/auth'
import { hasTaskAccess } from '@/lib/utils/utilFunctions'
import TaskDetail from '@/ui/tareas/TaskDetail'
import { redirect } from 'next/navigation'
export default async function TaskPage(props) {
  const session = await getSession()
  const permission = await hasTaskAccess(
    session?.user?.tipo_usuario,
    session?.user?.id,
    props.params.tareaId,
  )
  if (!permission) {
    redirect(`/home/obras/${props.searchParams.cid}`)
  }
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
