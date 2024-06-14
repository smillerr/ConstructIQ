import React from 'react'
import {
  HorizontalBarGraphh,
  LineGraphh,
  BarGraphh,
  PieGraphh,
} from './graphic'

const DashboardOvervIew = () => {
  return (
    <>
      <div className="bg-gray-100 text-gray-800">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-full h-64 aspect-square">
                <PieGraphh />
              </div>
              <h2 className="text-xl font-semibold mt-4">Gráfico Circular</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-full h-64 aspect-video">
                <BarGraphh />
              </div>
              <h2 className="text-xl font-semibold mt-4">Gráfico de Barras</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-full h-64 aspect-video">
                <HorizontalBarGraphh />
              </div>
              <h2 className="text-xl font-semibold mt-4">
                Gráfico de Barras Horizontales
              </h2>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-full h-64 aspect-auto">
                <LineGraphh />
              </div>
              <h2 className="text-xl font-semibold mt-4">Gráfico de Líneas</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardOvervIew
