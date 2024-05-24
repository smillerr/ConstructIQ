import { getSession } from '@/lib/utils/auth'
import UserForm from '@/ui/user/UserForm'
import { redirect } from 'next/navigation'
export default async function CrearUsuario() {
  const session = await getSession()
  if (!session) {
    redirect('/')
  }
  if (session?.user?.tipo_usuario !== 'Gerente') {
    redirect('/home/usuarios')
  }
  return (
    <>
      <h1 className="text-3xl mb-6 text-gray-500">Nuevo usuario</h1>
      <UserForm />
    </>
  )
}
