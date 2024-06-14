import { getSession } from '@/lib/utils/auth'
import DashboardOvervIew from '@/ui/dashboard/dashboardOvervIewDirector'
import { redirect } from 'next/navigation'

export default async function Director() {
  const session = await getSession()
  if (session?.user?.tipo_usuario !== 'Director de obra') {
    redirect('/home/usuarios')
  }
  return (
    <>
      <p>Dashbboard Director</p>
      <DashboardOvervIew />
    </>
  )
}
