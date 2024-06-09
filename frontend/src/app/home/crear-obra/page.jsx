import { getSession } from '@/lib/utils/auth'
import ObrasForm from '@/ui/obras/ObrasForm'
import { redirect } from 'next/navigation'
export default async function CrearObra() {
  const session = await getSession()
  if (!session) {
    redirect('/')
  }
  if (session?.user?.tipo_usuario !== 'Gerente') {
    redirect('/home/obras')
  }
  return (
    <>
      <h1 className="text-3xl mb-6 text-gray-500">Nueva obra</h1>
      <ObrasForm />
    </>
  )
}
