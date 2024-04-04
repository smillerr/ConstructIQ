'use client'
import React, { useState } from 'react'

const ObrasList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('fecha-asc')

  const obras = [
    { id: 1, nombre: 'Obra de Arte 1', fecha: '2022-01-01' },
    { id: 2, nombre: 'Escultura Moderna', fecha: '2023-05-15' },
    { id: 3, nombre: 'Pintura al Óleo', fecha: '2021-10-20' },
  ]

  const filteredObras = obras.filter((obra) =>
    obra.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedObras = filteredObras.sort((a, b) => {
    if (sortOrder === 'fecha-asc') {
      return new Date(a.fecha) - new Date(b.fecha)
    } else {
      return new Date(b.fecha) - new Date(a.fecha)
    }
  })

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar obras"
          className="bg-transparent border-b-2 border-gray-300 py-2 px-4 w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-transparent border-b-2 border-gray-300 py-2 px-4"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="fecha-asc">Fecha ascendente</option>
          <option value="fecha-desc">Fecha descendente</option>
        </select>
      </div>

      <div className="px-3 py-4 flex justify-center">
        <div className="grid grid-cols-5 gap-4">
          {sortedObras.map((obra) => (
            <div
              key={obra.id}
              className="bg-white shadow-md rounded-md p-4 flex flex-col items-center"
            >
              <span className="text-gray-500">{obra.nombre}</span>
              <span className="text-gray-500">{obra.fecha}</span>
            </div>
          ))}
          <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
            + Nueva Obra
          </button>
        </div>
      </div>
    </div>
  )
}

export default ObrasList
