'use client'
import {
  UserGroupIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

const role = 'gerente' // This would be the user's role from the currente session.
const links = [
  { name: 'Dashboard', href: `/home/${role}`, icon: HomeIcon },
  {
    name: 'Usuarios',
    href: '/home/usuarios',
    icon: UserGroupIcon,
  },
  { name: 'Obras', href: '/home/obras', icon: WrenchScrewdriverIcon },
]

export default function SideNavLinks() {
  const path = usePathname()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
            ${path === link.href ? 'bg-sky-100 text-blue-600' : 'text-gray-600'}`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
