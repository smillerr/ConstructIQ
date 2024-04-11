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
  ]

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl">Users</h1>
        <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
          + New User
        </button>
      </div>

      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Photo</th>
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Role</th>
              <th></th>
            </tr>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-orange-100 bg-gray-100"
              >
                <td className="p-3 px-5">
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3 px-5">{user.name}</td>
                <td className="p-3 px-5">{user.role}</td>
                <td className="p-3 px-5 flex justify-end">
                  <button className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Edit
                  </button>
                  <button className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Delete
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