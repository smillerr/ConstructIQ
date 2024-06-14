import React from 'react'
import { LineGraph, PieeGraphh } from './graphic'

const DashboardOvervIew = () => {
  return (
    <>
      <div className="bg-gray-100 text-gray-800">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-full h-64 aspect-video">
                <LineGraph />
              </div>
              <h2 className="text-xl font-semibold mt-4">
                Cantidad de Usuarios por Rol
              </h2>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="w-full h-64 aspect-video">
                <PieeGraphh />
              </div>
              <h2 className="text-xl font-semibold mt-4">
                Cantidad de Usuarios por Estado
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardOvervIew
