import { getSession } from '@/lib/utils/auth'
import ObraDetail from '@/ui/obras/ObraDetail'

export default async function ObraPage(props) {
  const session = await getSession()
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
