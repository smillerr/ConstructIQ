import { PlusIcon } from '@heroicons/react/24/outline'

const TasksSection = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold ">Tasks</h2>
        <button className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded ">
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="border-b border-gray-300 py-2 flex justify-between items-center">
        <p>
          <a href="/" className="text-blue-600">
            #133 Create mockup for view where manager input user data
          </a>
        </p>
        <p className="text-gray-600">New</p>
        <p className="text-gray-600">Not assigned</p>
      </div>
    </div>
  )
}

export default TasksSection
