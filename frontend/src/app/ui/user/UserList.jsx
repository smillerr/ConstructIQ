'use client'
import { listUser } from '@/lib/utils/utilFunctions'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DeleteUserModal from './DeleteUserModal'
import UsersListSkeleton from '../common/Skeletons/Users/UsersListSkeleton'
import { getSessionAction } from '@/lib/utils/actions'
import { Avatar } from '@mui/material'

export default function UserList() {
  const [users, setUsers] = useState(null)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [userType, setUserType] = useState(null)
  useEffect(() => {
    async function populateList() {
      const users = await listUser()
      setUsers(users)
    }
    async function getUserType() {
      const session = await getSessionAction()
      setUserType(session?.user?.tipo_usuario)
    }
    populateList()
    getUserType()
  }, [])
  const handleUserDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
  }

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
        <table className="w-full text-md bg-white shadow-md rounded mb-4 table-auto">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5 hidden md:block">Photo</th>
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Role</th>
              <th></th>
            </tr>
            {!users && <UsersListSkeleton />}
            {users
              ?.filter((user) => user?.is_active)
              .map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-sky-100 bg-gray-70"
                >
                  <td className="p-3 px-5 hidden md:block">
                    <Avatar alt={user.nombre} src={user.foto_perfil} />
                  </td>
                  <td className="p-3 px-5">{user.nombre}</td>
                  <td className="p-3 px-5">{user.tipo_usuario}</td>
                  {userType === 'Gerente' && (
                    <td className="p-3 px-5 ">
                      <div className="flex items-center justify-end">
                        <Link
                          href={`usuarios/${user.id}`}
                          className={`flex items-center justify-center mr-3 text-sm ${
                            user?.tipo_usuario === 'Gerente'
                              ? 'bg-blue-200'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }  text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
                          style={{
                            pointerEvents:
                              user?.tipo_usuario === 'Gerente'
                                ? 'none'
                                : 'auto',
                          }}
                        >
                          <PencilIcon className="h-5 w-5 text-white-600" />
                          <p className="hidden ml-1 md:block"> Editar </p>
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedUserId(user.id)
                            setOpenModal(true)
                          }}
                          className="flex items-center justify-center mr-3 text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline disabled:bg-disabled-red disabled:border-slate-200 disabled:shadow-none"
                          disabled={user?.tipo_usuario === 'Gerente'}
                        >
                          <TrashIcon className="h-5 w-5 text-white-600" />
                          <p className="hidden ml-1 md:block"> Eliminar </p>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        {openModal && (
          <DeleteUserModal
            open={openModal}
            setOpen={setOpenModal}
            userId={selectedUserId}
            handleUserDelete={handleUserDelete}
          />
        )}
      </div>
    </div>
  )
}
