import { getSession } from '@/lib/utils/auth'
import { hasConstructionAccess } from '@/lib/utils/utilFunctions'
import ObraDetail from '@/ui/obras/ObraDetail'
import { redirect } from 'next/navigation'

export default async function ObraPage(props) {
  const session = await getSession()
  if (!Number(props.params.obraId)) {
    redirect('/home/obras')
  }
  const permissions = await hasConstructionAccess(
    session.user.tipo_usuario,
    session.user.id,
    props.params.obraId,
  )
  if (!permissions) {
    redirect('/home/obras')
  }
  return (
    <>
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl">Detalle de obra</h1>
      </div>
      <ObraDetail
        obraId={props.params.obraId}
        userType={session?.user?.tipo_usuario}
      />
    </>
  )
}
