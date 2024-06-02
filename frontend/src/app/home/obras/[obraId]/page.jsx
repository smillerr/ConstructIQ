import { redirect } from 'next/navigation'
import { getSession } from '@/lib/utils/auth'
export default async function ObraPage() {
  const session = await getSession()
  if (session?.user?.tipo_usuario !== 'Gerente') {
    redirect('/home/usuarios')
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="max-w-5xl mx-4 bg-white p-6 rounded shadow flex-1">
        <div className="flex mb-4">
          <img
            src="https://picsum.photos/500/300/?blur"
            alt="Puente peatonal"
            className="mr-4"
          />
          <img src="https://picsum.photos/300/?blur" alt="Geolocacion" />
        </div>

        <h1 className="text-2xl font-bold text-blue-600">Puente peatonal</h1>
        <p className="text-gray-600">Vial</p>
        <div className="flex items-center mt-2">
          <button className="bg-orange-100 text-orange-600 text-sm px-2 py-1 rounded">
            Estado <i className="fas fa-times" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 mb-6">
          <p className="text-gray-600">Created by Juan Sebastian Miller</p>
          <p className="text-gray-600">12 Apr 2024 08:31</p>
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <p className="text-gray-600">Fecha de inicio</p>
          <p className="text-gray-600">12 Apr 2024 08:31</p>
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <p className="text-gray-600">Fecha de entrega</p>
          <p className="text-gray-600">26 Apr 2024 08:31</p>
        </div>
        <p className="mb-6 text-gray-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          minima totam, ut in cupiditate ad eum dolore consectetur officiis
          neque, optio sequi possimus numquam, veritatis quaerat natus
          voluptates hic velit.
        </p>
        <div>
          <h2 className="text-gray-600 font-bold mb-2">Tasks</h2>
          <div className="border-b border-gray-300 py-2 flex justify-between items-center">
            <p>
              <a href="/" className="text-blue-600">
                #133 Create mockup for view where manager input user data
              </a>
            </p>
            <p className="text-gray-600">New</p>
            <p className="text-gray-600">Not assigned</p>
          </div>
          <button className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded mt-2">
            <i className="fas fa-plus" />
          </button>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded">
            <i className="fas fa-users" />
          </button>
          <button className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded">
            <i className="fas fa-tasks" />
          </button>
          <button className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded">
            <i className="fas fa-lock" />
          </button>
          <button className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded">
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>
      <div className="mx-4 md:w-64 bg-gray-50 p-6 rounded shadow">
        <div className="mb-4">
          <h2 className="text-gray-600 font-bold mb-2">POINTS</h2>
          <ul className="text-gray-600">
            <li>
              UX <span className="ml-2">0</span>
            </li>
            <li>
              Design <span className="ml-2">1/2</span>
            </li>
            <li>
              Frontend Dev <span className="ml-2">2</span>
            </li>
            <li>
              Backend Dev <span className="ml-2">2</span>
            </li>
            <li>
              Scrum master <span className="ml-2">?</span>
            </li>
          </ul>
          <p className="font-bold text-gray-600 mt-2">
            total points <span className="ml-2">4.5</span>
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-gray-600 font-bold mb-2">ASSIGNED</h2>
          <button className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded mt-1">
            + Add assigned
          </button>
          <button className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded mt-1">
            Assign to me
          </button>
        </div>
        <div>
          <h2 className="text-gray-600 font-bold mb-2">WATCHERS</h2>
          <button className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded mt-1">
            + Add watchers
          </button>
          <button className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded mt-1">
            <i className="fas fa-eye" /> Watch
          </button>
        </div>
      </div>
    </div>
  )
}
