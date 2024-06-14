import { getSession } from '@/lib/utils/auth'
import AvanceDetail from '@/ui/avances/AvanceDetail'

export default async function AdvancementPage(props) {
  const session = await getSession()
  /* const permission = await hasTaskAccess(
    session?.user?.tipo_usuario,
    session?.user?.id,
    props.params.tareaId,
  )
  if (!permission) {
    redirect(`/home/obras/${props.searchParams.cid}`)
  } */
  return (
    <>
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl">Detalle de avance</h1>
      </div>
      <AvanceDetail
        taskId={props.params.avanceId}
        constructionId={props.searchParams.cid}
        constructionName={props.searchParams.cname}
        userType={session?.user?.tipo_usuario}
      />
    </>
  )
}
