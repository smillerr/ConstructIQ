import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function ConstructIQLogo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[20px]">ConstructIQ</p>
    </div>
  )
}
