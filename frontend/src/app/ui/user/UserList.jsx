import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const UserList = () => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Admin',
      photoUrl: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'User',
      photoUrl: 'https://via.placeholder.com/50',
    },
    {
      id: 3,
      name: 'Jane Doe',
      role: 'Gerente',
      photoUrl: 'https://via.placeholder.com/50',
    },
    {
      id: 4,
      name: 'John Smith',
      role: 'Capataz',
      photoUrl: 'https://via.placeholder.com/50',
    },
  ]

  return (
    <div className="text-gray-900 bg-gray-50 rounded">
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl">Gestion de usuarios</h1>
        <button className="flex items-center justify-center mr-3 text-sm bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
          <PlusIcon className="h-5 w-5 text-white-600" />
          <p className="hidden ml-1 md:block"> Crear usuario </p>
        </button>
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
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-sky-100 bg-gray-70"
              >
                <td className="p-3 px-5 hidden md:block">
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3 px-5">{user.name}</td>
                <td className="p-3 px-5">{user.role}</td>
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

export default UserList
