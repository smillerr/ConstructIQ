import DashboardOvervIew from '@/ui/dashboard/dashboardOverviewGerentee'
import { getSession } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'

export default async function Gerente() {
  const session = await getSession()
  if (session?.user?.tipo_usuario !== 'Gerente') {
    redirect('/home/usuarios')
  }
  return (
    <>
      <p>Dashboard Gerente</p>
      <DashboardOvervIew />
    </>
  )
}
