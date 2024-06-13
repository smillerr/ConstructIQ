import { getSession } from '@/lib/utils/auth'
import { construcionUrlResolver } from '@/lib/utils/utilFunctions'
import ObrasList from '@/ui/obras/ObrasList'

export default async function Obras() {
  const session = await getSession()
  const url = construcionUrlResolver(session.user.tipo_usuario, session.user.id)
  return (
    <>
      <p>Dashboard para obras</p>
      <ObrasList obrasUrl={url} />
    </>
  )
}
