'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { getAccessToken } from '@/lib/utils/actions'
import ImageWithFallback from '../common/ImageWithFallback'

const ObrasList = ({ obrasUrl }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('fecha-asc')
  const [obras, setObras] = useState([])

  useEffect(() => {
    const fetchObras = async () => {
      const access_token = await getAccessToken()
      try {
        const res = await fetch(obrasUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          cache: 'no-cache',
        })
        if (res.ok) {
          const data = await res.json()
          setObras(data)
        }
      } catch (error) {
        console.error('error', error)
      }
    }

    fetchObras()
  }, [])

  const filteredObras = obras.filter((obra) =>
    obra.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedObras = filteredObras.sort((a, b) => {
    if (sortOrder === 'fecha-asc') {
      return new Date(a.fecha_inicio) - new Date(b.fecha_inicio)
    } else {
      return new Date(b.fecha_final) - new Date(a.fecha_final)
    }
  })

  return (
    <div className="text-gray-900 bg-gray-100 min-h-screen">
      <div className="p-4 flex justify-between items-center bg-white shadow-md">
        <Link
          href={'/home/crear-obra'}
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center col-span-full sm:col-span-2 md:col-span-1 lg:col-span-1"
        >
          + Nueva Obra
        </Link>
        <input
          type="text"
          placeholder="Buscar obras"
          className="bg-transparent border-b-2 border-gray-300 py-2 px-4 w-1/3 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="fecha-asc">Fecha ascendente</option>
          <option value="fecha-desc">Fecha descendente</option>
        </select>
      </div>

      <div className="px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {sortedObras?.length === 0 && <p>Cargando obras....</p>}
          {sortedObras
            .filter((obra) => obra?.activo)
            .map((obra) => (
              <div
                key={obra.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <ImageWithFallback
                  fallbackImage={'/default_construction.png'}
                  src={obra.img_obra}
                  alt={obra.nombre}
                  width={300}
                  height={160}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{obra.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-4">{obra.tipo_obra}</p>
                  <p className="text-gray-600 text-sm mb-4">
                    {obra.descripcion}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {obra.fecha_inicio} ; {obra.fecha_final}
                  </p>

                  <Link
                    href={'/home/obras/' + obra.id}
                    className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded inline-block"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ObrasList
