'use client'
import React, { useEffect, useState } from 'react'
import MapWidget from '@/ui/common/Maps/MapWidget'
import EngineeringIcon from '@mui/icons-material/Engineering'
import HandymanIcon from '@mui/icons-material/Handyman'
import CarpenterIcon from '@mui/icons-material/Carpenter'
import PlumbingIcon from '@mui/icons-material/Plumbing'
import AddStaffModal from './AddStaffModal'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import DeleteConstructionModal from './DeleteConstructionModal'
import TasksSection from './TasksSection'
import {
  editConstruction,
  getConstruction,
  getTasksByConstruction,
} from '@/lib/utils/utilFunctions'
import { badgeStatusColor } from '@/lib/utils/commonStyles'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageWithFallback from '../common/ImageWithFallback'

const ObraDetail = ({ obraId, userType }) => {
  const router = useRouter()
  const canDelete = userType === 'Gerente' || userType === 'Director de obra'
  const [obra, setObra] = useState(null)
  const [tareas, setTareas] = useState([])
  const [director, setDirector] = useState(null)
  const [capataces, setCapataces] = useState([])
  const [ayudantes, setAyudantes] = useState([])
  const [peones, setPeones] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const fetchObraDetails = async () => {
    try {
      const obraData = await getConstruction(obraId)
      const taskList = await getTasksByConstruction(obraId)
      console.log('taskList', taskList)
      setObra(obraData)
      setTareas(taskList)
      setDirector(obraData.id_director)
      setCapataces(obraData.id_capataces)
      //Filter the staff by role
      const ayudantes = obraData?.personal_info?.personal.filter(
        (user) => user.tipo_usuario === 'Ayudante de albañil',
      )

      setAyudantes(ayudantes)
      const peones = obraData?.personal_info?.personal.filter(
        (user) => user.tipo_usuario === 'Peón',
      )
      setPeones(peones)
    } catch (error) {
      console.error('Error fetching obra details:', error)
    }
  }
  useEffect(() => {
    fetchObraDetails()
  }, [obraId])

  const handleUserDelete = async (userId, userType) => {
    let updatedData = {}

    switch (userType) {
      case 'capataces': {
        const updatedCapataces = capataces.filter((user) => user.id !== userId)

        updatedData = { id_capataces: updatedCapataces.map((user) => user.id) }
        break
      }

      case 'ayudantes': {
        const updatedAyudantes = ayudantes.filter((user) => user.id !== userId)

        updatedData = {
          obra_personal: {
            personal: [
              ...updatedAyudantes.map((user) => user.id),
              ...peones.map((user) => user.id),
            ],
          },
        }
        break
      }

      case 'peones': {
        const updatedPeones = peones.filter((user) => user.id !== userId)

        updatedData = {
          obra_personal: {
            personal: [
              ...updatedPeones.map((user) => user.id),
              ...ayudantes.map((user) => user.id),
            ],
          },
        }
        break
      }

      default:
        break
    }
    try {
      const editInfo = await editConstruction(obraId, updatedData)
      setObra(editInfo)
      setDirector(editInfo.id_director)
      setCapataces(editInfo.id_capataces)
      //Filter the staff by role
      const ayudantes = editInfo?.personal_info?.personal.filter(
        (user) => user.tipo_usuario === 'Ayudante de albañil',
      )

      setAyudantes(ayudantes)
      const peones = editInfo?.personal_info?.personal.filter(
        (user) => user.tipo_usuario === 'Peón',
      )
      setPeones(peones)
    } catch (error) {
      console.error('Error updating obra details:', error)
    }
  }
  const handleAddStaff = async (formData) => {
    let updatedData = {}
    //Retrieve the personal prop from the formData
    const formDataPersonal = formData?.personal
    updatedData = {
      obra_personal: {
        personal: [
          ...formDataPersonal,
          ...peones.map((user) => user.id),
          ...ayudantes.map((user) => user.id),
        ],
      },
    }
    try {
      const editInfo = await editConstruction(obraId, updatedData)
      setObra(editInfo)
      setDirector(editInfo.id_director)
      setCapataces(editInfo.id_capataces)
      //Filter the staff by role
      const ayudantes = editInfo?.personal_info?.personal.filter(
        (user) => user.tipo_usuario === 'Ayudante de albañil',
      )

      setAyudantes(ayudantes)
      const peones = editInfo?.personal_info?.personal.filter(
        (user) => user.tipo_usuario === 'Peón',
      )
      setPeones(peones)
    } catch (error) {
      console.error('Error updating obra details:', error)
    }
    setModalOpen(false)
  }

  if (!obra)
    return <div className="mx-4">Cargando informacion de la obra...</div>

  return (
    <div className="flex flex-col md:flex-row">
      <div className="max-w-5xl mx-4 bg-white p-6 rounded shadow flex-1">
        <div className="flex mb-4">
          <ImageWithFallback
            fallbackImage={'/default_construction.png'}
            src={obra.img_obra ? obra.img_obra : '/default_construction.png'}
            alt={obra.nombre}
            width={490}
            height={290}
            className="h-72 object-cover"
          />
          <MapWidget
            lat={obra?.ubicacion?.latitud}
            lng={obra?.ubicacion?.longitud}
          />
        </div>
        <h1 className="text-2xl font-bold text-blue-600">{obra.nombre}</h1>
        <p className="text-gray-600">{obra.tipo_obra}</p>

        <div className="flex items-center mt-2">
          <button
            className={`${badgeStatusColor(obra.estado)} text-sm px-2 py-1 rounded`}
          >
            {obra.estado}
          </button>
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <p className="text-gray-600">Fecha de inicio</p>
          <p className="text-gray-600">{obra.fecha_inicio}</p>
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <p className="text-gray-600">Fecha de entrega</p>
          <p className="text-gray-600">{obra.fecha_final}</p>
        </div>
        <p className="mb-6 text-gray-800">
          {obra.descripcion || 'No hay descripción disponible'}
        </p>
        {tareas?.length > 0 ? (
          <TasksSection
            taskList={tareas}
            relatedConstruction={obra.nombre}
            relatedId={obra.id}
          />
        ) : (
          <div className="flex justify-between items-center">
            <h2 className="text-gray-600 font-bold ">
              No hay tareas para esta obra
            </h2>
            <button className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded ">
              <Link
                href={{
                  pathname: '/home/crear-tarea',
                  query: {
                    cid: obraId,
                    cname: obra.nombre,
                  },
                }}
              >
                <PlusIcon className="h-5 w-5" />
              </Link>
            </button>
          </div>
        )}
        <div className="flex justify-end mt-6 space-x-2">
          <Link
            href={`/home/obras/${obraId}/editar`}
            className="bg-gray-200 text-black text-sm px-2 py-1 rounded"
          >
            <PencilIcon className="h-5 w-5" />
          </Link>
          <button
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 rounded"
            onClick={() => setDeleteModal(true)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mx-4 md:w-64 bg-gray-50 p-6 rounded shadow">
        <div className="mb-4">
          <h2 className="text-gray-600 font-bold mb-2">Personal</h2>
          <div className="text-gray-600">
            <p className="text-gray-600 font-bold ">
              <span className="mr-2">
                <EngineeringIcon />
              </span>
              Director
            </p>
            <ul id="director-list">
              <li className="">{director?.nombre}</li>
            </ul>
            <p className="text-gray-600 font-bold ">
              <span className="mr-2">
                <HandymanIcon />
              </span>
              Capataces
            </p>
            <ul id="capataces-list">
              {capataces?.map((capataz, index) => {
                return (
                  <li key={index} className="flex justify-between items-center">
                    {capataz.nombre}
                    {canDelete && capataces?.length > 1 && (
                      <button
                        className="text-red-600 text-sm px-2 py-1 rounded ml-2"
                        onClick={() =>
                          handleUserDelete(capataz.id, 'capataces')
                        }
                      >
                        Quitar
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
            <p className="text-gray-600 font-bold ">
              <span className="mr-2">
                <CarpenterIcon />
              </span>
              Ayudantes
            </p>
            <ul id="ayudantes-list">
              {ayudantes?.length > 0 ? (
                ayudantes?.map((ayudante, index) => {
                  return (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      {ayudante.nombre}
                      {canDelete && ayudantes?.length > 1 && (
                        <button
                          className="text-red-600 text-sm px-2 py-1 rounded ml-2"
                          onClick={() =>
                            handleUserDelete(ayudante.id, 'ayudantes')
                          }
                        >
                          Quitar
                        </button>
                      )}
                    </li>
                  )
                })
              ) : (
                <li>No hay ayudantes asignados</li>
              )}
            </ul>
            <p className="text-gray-600 font-bold ">
              <span className="mr-2">
                <PlumbingIcon />
              </span>
              Peones
            </p>
            <ul id="peones-list">
              {peones?.length > 0 ? (
                peones?.map((peon, index) => {
                  return (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      {peon.nombre}
                      {canDelete && peones?.length > 1 && (
                        <button
                          className="text-red-600 text-sm px-2 py-1 rounded ml-2"
                          onClick={() => handleUserDelete(peon.id, 'peones')}
                        >
                          Quitar
                        </button>
                      )}
                    </li>
                  )
                })
              ) : (
                <li>No hay peones asignados</li>
              )}
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <button
            type="button"
            className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded mt-1 disabled:opacity-50"
            onClick={() => setModalOpen(true)}
            disabled={!canDelete}
          >
            + Añadir personal
          </button>
        </div>
        {modalOpen && (
          <AddStaffModal
            open={modalOpen}
            setOpen={setModalOpen}
            handleFormSubmit={handleAddStaff}
          />
        )}
        {deleteModal && (
          <DeleteConstructionModal
            open={deleteModal}
            setOpen={setDeleteModal}
            constructionId={obraId}
            routingCallback={router.replace}
          />
        )}
      </div>
    </div>
  )
}

export default ObraDetail
