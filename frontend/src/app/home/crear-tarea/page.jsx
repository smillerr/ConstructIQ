import { getSession } from '@/lib/utils/auth'
import TaskForm from '@/ui/tareas/TaskForm'
import { redirect } from 'next/navigation'
export default async function CrearTarea() {
  const session = await getSession()
  if (!session) {
    redirect('/')
  }
  if (session?.user?.tipo_usuario !== 'Gerente') {
    redirect('/home/obras')
  }
  return (
    <>
      <h1 className="text-3xl mb-6 text-gray-500">Nueva Tarea</h1>
      <TaskForm />
    </>
  )
}
