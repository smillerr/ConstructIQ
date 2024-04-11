import { listUser } from '@/lib/utils/utilFunctions'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

export default async function UserList() {
  const users = await listUser()

  return (
    <div className="text-gray-900 bg-gray-50 rounded">
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl">Gestion de usuarios</h1>
        <Link
          href={'/home/crear-usuario'}
          className="flex items-center justify-center mr-3 text-sm bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        >
          <PlusIcon className="h-5 w-5 text-white-600" />
          <p className="hidden ml-1 md:block"> Crear usuario </p>
        </Link>
      </div>

      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5 hidden md:block">Photo</th>
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Role</th>
              <th></th>
            </tr>

            {users?.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-sky-100 bg-gray-70"
              >
                <td className="p-3 px-5 hidden md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </td>
                <td className="p-3 px-5">{user.nombre}</td>
                <td className="p-3 px-5">{user.tipo_usuario}</td>
                <td className="p-3 px-5 flex justify-end">
                  <Link
                    className="flex items-center justify-center mr-3 text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    href={'/'}
                  >
                    <PencilIcon className="h-5 w-5 text-white-600" />
                    <p className="hidden ml-1 md:block"> Editar </p>
                  </Link>
                  <button className="flex items-center justify-center mr-3 text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    <TrashIcon className="h-5 w-5 text-white-600" />
                    <p className="hidden ml-1 md:block"> Eliminar </p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
