import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import AvancesRow from './AvancesRow'

const AvancesSection = ({ taskList, relatedConstruction, relatedId }) => {
  console.log('name', relatedConstruction)
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold ">Avances</h2>
        <button className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded ">
          <Link
            href={{
              pathname: '/home/crear-avance',
              query: {
                cid: relatedId,
                cname: relatedConstruction,
              },
            }}
          >
            <PlusIcon className="h-5 w-5" />
          </Link>
        </button>
      </div>
      {taskList?.map((tarea) => (
        <AvancesRow
          key={tarea.id}
          id={tarea.id}
          description={tarea.descripcion}
          porcentaje={tarea.tarea_porcentaje}
          constructionId={relatedId}
          constructionName={relatedConstruction}
          necesidades={tarea.necesidades}
        />
      ))}
    </div>
  )
}

export default AvancesSection
