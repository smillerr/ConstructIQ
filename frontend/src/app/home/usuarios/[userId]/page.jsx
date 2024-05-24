import EditUserForm from '@/ui/user/EditUserForm'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/utils/auth'
export default async function EditUser(props) {
  const session = await getSession()
  if (session?.user?.tipo_usuario !== 'Gerente') {
    redirect('/home/usuarios')
  }
  return (
    <>
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl">Editar usuario</h1>
      </div>
      <EditUserForm userId={props.params.userId} />
    </>
  )
}
