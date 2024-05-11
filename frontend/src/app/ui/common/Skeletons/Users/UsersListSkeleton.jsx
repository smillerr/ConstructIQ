const UsersListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <tr key={i} className="border-b hover:bg-sky-100 bg-gray-70">
          <td className="p-3 px-5 hidden md:block">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
          </td>
          <td className="p-3 px-5">
            <div className="h-5 w-full rounded-md bg-gray-200" />
          </td>
          <td className="p-3 px-5">
            <div className="h-5 w-full rounded-md bg-gray-200" />
          </td>
          <td className="p-3 px-5 flex justify-end">
            <div className="flex items-center justify-center mr-3">
              <div className="block md:hidden h-5 w-10 rounded-md bg-gray-200" />
              <div className="hidden md:block ml-2 h-5 w-20 rounded-md bg-gray-200" />
            </div>
            <div className="flex items-center justify-center mr-3">
              <div className="block md:hidden h-5 w-10 rounded-md bg-gray-200" />
              <div className="hidden md:block ml-2 h-5 w-20 rounded-md bg-gray-200" />
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}

export default UsersListSkeleton
