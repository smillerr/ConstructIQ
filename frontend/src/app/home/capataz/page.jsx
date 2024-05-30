import { getSession } from '@/lib/utils/auth'
import { redirect } from 'next/navigation'

//import DashboardOvervIew from '@/ui/dashboard/dashboardOvervIew'
export default async function Capataz() {
  const session = await getSession()
  if (session?.user?.tipo_usuario !== 'Capataz de obra') {
    redirect('/home/usuarios')
  }
  return (
    <>
      <p>Dashboard Capataz</p>
      {/* <DashboardOvervIew /> */}
    </>
  )
}
