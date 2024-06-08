import { redirect } from 'next/navigation'
import { getSession } from './lib/utils/auth'
import UserLoginForm from './ui/user/UserLoginForm'
import { dashboardPaths } from './lib/utils/utilFunctions'

export default async function Home() {
  const session = await getSession()
  if (session) {
    const userType = await session.user.tipo_usuario
    if (userType !== 'Peón' && userType !== 'Ayudante de obra') {
      redirect(dashboardPaths(userType))
    }
  }
  return (
    <section className="bg-white ">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <UserLoginForm />
      </div>
    </section>
  )
}
