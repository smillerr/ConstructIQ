import Link from 'next/link'
import { PowerIcon } from '@heroicons/react/24/outline'
import SideNavLinks from './SideNavLinks'
import ConstructIQLogo from './ConstructIQLogo'
import { redirect } from 'next/navigation'
import { dashboardPaths } from '@/lib/utils/utilFunctions'
import { getSession } from '@/lib/utils/auth'
import { logOut } from '@/lib/utils/actions'

export default async function SideNav() {
  const session = await getSession()
  if (!session) {
    redirect('/')
  }
  const userType = await session?.user?.tipo_usuario
  return (
    <div className="flex md:h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href={dashboardPaths(userType)}
      >
        <div className="w-32 text-white md:w-40">{<ConstructIQLogo />}</div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {<SideNavLinks homePath={dashboardPaths(userType)} />}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server'
            await logOut()
            redirect('/')
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  )
}
