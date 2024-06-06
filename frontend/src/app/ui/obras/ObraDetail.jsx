'use client'
import React, { useEffect, useState } from 'react'
import MapWidget from '@/ui/common/Maps/MapWidget'
import EngineeringIcon from '@mui/icons-material/Engineering'
import HandymanIcon from '@mui/icons-material/Handyman'
import CarpenterIcon from '@mui/icons-material/Carpenter'
import PlumbingIcon from '@mui/icons-material/Plumbing'
import AddStaffModal from './AddStaffModal'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import DeleteConstructionModal from './DeleteConstructionModal'
import TasksSection from './TasksSection'

const ObraDetail = ({ obraId, userType }) => {
  const canDelete = userType === 'Gerente' || userType === 'Director de obra'
  const [obra, setObra] = useState(null)
  const [director, setDirector] = useState(null)
  const [capataces, setCapataces] = useState([])
  const [ayudantes, setAyudantes] = useState([])
  const [peones, setPeones] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const mockFetchObraDetails = async () => {
    // Mock data
    return {
      id: obraId,
      nombre: 'Colegio campestre',
      estado: 'en progreso',
      lat: 12.345,
      lng: 67.89,
      id_director: 'Director 1',
      id_capataces: ['Capataz 1', 'Capataz 2'],
      ayudantes: ['Ayudante 1', 'Ayudante 2', 'Ayudante 3'],
      peones: ['Peon 1', 'Peon 2', 'Peon 3'],
    }
  }

  const mockUpdateObraDetails = async (updateData) => {
    console.log('Updating obra with data:', updateData)
    // Simulate an API update call
    return { success: true }
  }
  const fetchObraDetails = async () => {
    try {
      const data = await mockFetchObraDetails()
      setObra(data)
      setDirector(data.id_director)
      setCapataces(data.id_capataces)
      setAyudantes(data.ayudantes)
      setPeones(data.peones)
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
        const updatedCapataces = capataces.filter((user) => user !== userId)
        setCapataces(updatedCapataces)
        updatedData = { id_capataces: updatedCapataces }
        break
      }

      case 'ayudantes': {
        const updatedAyudantes = ayudantes.filter((user) => user !== userId)
        setAyudantes(updatedAyudantes)
        updatedData = { personal: [updatedAyudantes, ...peones] }
        break
      }

      case 'peones': {
        const updatedPeones = peones.filter((user) => user !== userId)
        setPeones(updatedPeones)
        updatedData = { personal: [updatedPeones, ...ayudantes] }
        break
      }

      default:
        break
    }

    try {
      const response = await mockUpdateObraDetails(updatedData)
      if (response.success) {
        // Re-fetch the obra details to trigger a re-render
        const data = await mockFetchObraDetails()
        setObra(data)
        setDirector(data.id_director)
        setCapataces(data.id_capataces)
        setAyudantes(data.ayudantes)
        setPeones(data.peones)
      }
    } catch (error) {
      console.error('Error updating obra details:', error)
    }
  }
  const handleAddStaff = async (formData) => {
    let updatedData = {}
    //Retrieve the personal prop from the formData
    const formDataPersonal = formData?.personal
    //Filter the personal prop to get the ayudantes
    const formDataAyudantes = formDataPersonal?.filter(
      (user) => user.tipo_usuario === 'Ayudante de albañil',
    )
    //Filter the personal prop to get the peones
    const formDataPeones = formDataPersonal?.filter(
      (user) => user.tipo_usuario === 'Peón',
    )

    const updatedAyudantes = [...ayudantes, ...formDataAyudantes]
    setAyudantes(updatedAyudantes)
    const updatedPeones = [...peones, ...formDataPeones]
    setPeones(updatedPeones)
    updatedData = { personal: [...updatedAyudantes, ...updatedPeones] }
    try {
      const response = await mockUpdateObraDetails(updatedData)
      if (response.success) {
        // Re-fetch the obra details to trigger a re-render
        const data = await mockFetchObraDetails()
        setObra(data)
        setDirector(data.id_director)
        setCapataces(data.id_capataces)
        setAyudantes(data.ayudantes)
        setPeones(data.peones)
      }
    } catch (error) {
      console.error('Error updating obra details:', error)
    }
    setModalOpen(false)
  }
  if (!obra) return <div>Loading...</div>

  return (
    <div className="flex flex-col md:flex-row">
      <div className="max-w-5xl mx-4 bg-white p-6 rounded shadow flex-1">
        <div className="flex mb-4">
          <img
            src="https://picsum.photos/500/300/?blur"
            alt="Puente peatonal"
            className="mr-4 h-72"
          />
          <MapWidget />
        </div>

        <h1 className="text-2xl font-bold text-blue-600">{obra.nombre}</h1>
        <p className="text-gray-600">{obra.estado}</p>

        <div className="flex items-center mt-2">
          <button className="bg-orange-100 text-orange-600 text-sm px-2 py-1 rounded">
            Estado <i className="fas fa-times" />
          </button>
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
        <TasksSection />
        <div className="flex justify-end mt-6 space-x-2">
          <button className="bg-gray-200 text-black text-sm px-2 py-1 rounded">
            <PencilIcon className="h-5 w-5" />
          </button>
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
              <li className="">{director}</li>
            </ul>
            <p className="text-gray-600 font-bold ">
              <span className="mr-2">
                <HandymanIcon />
              </span>
              Capataces
            </p>
            <ul id="capataces-list">
              {capataces.map((capataz, index) => {
                return (
                  <li key={index} className="flex justify-between items-center">
                    {capataz}
                    {canDelete && (
                      <button
                        className="text-red-600 text-sm px-2 py-1 rounded ml-2"
                        onClick={() => handleUserDelete(capataz, 'capataces')}
                      >
                        Delete
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
              {ayudantes.map((ayudante, index) => {
                return (
                  <li key={index} className="flex justify-between items-center">
                    {ayudante}
                    {canDelete && (
                      <button
                        className="text-red-600 text-sm px-2 py-1 rounded ml-2"
                        onClick={() => handleUserDelete(ayudante, 'ayudantes')}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
            <p className="text-gray-600 font-bold ">
              <span className="mr-2">
                <PlumbingIcon />
              </span>
              Peones
            </p>
            <ul id="peones-list">
              {peones.map((peon, index) => {
                return (
                  <li key={index} className="flex justify-between items-center">
                    {peon}
                    {canDelete && (
                      <button
                        className="text-red-600 text-sm px-2 py-1 rounded ml-2"
                        onClick={() => handleUserDelete(peon, 'peones')}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                )
              })}
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
            routingCallback={() => console.log('router push')}
          />
        )}
      </div>
    </div>
  )
}

export default ObraDetail
