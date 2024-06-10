'use client'
import { listUser, listUsersByRole } from '@/lib/utils/utilFunctions'
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

const SelectStaff = ({ control }) => {
  const [trabajadores, setTrabajadores] = useState([])
  const [selectedTrabajadores, setSelectedTrabajadores] = useState([])
  const [loading, setLoading] = useState(true)
  const handleChangeTrabajadores = (event, onChange) => {
    const value = event.target.value
    onChange(value)
    setSelectedTrabajadores(value)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const allUsers = await listUser()
        const peonesData = await listUsersByRole(allUsers, 'Peón')
        const ayudantesAlbañilData = await listUsersByRole(
          allUsers,
          'Ayudante de albañil',
        )
        const trabajadoresData = [...peonesData, ...ayudantesAlbañilData]
        setTrabajadores(trabajadoresData)
        setLoading(false)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }
    fetchData()
  }, [])
  if (loading) {
    return <p>Cargando...</p>
  }
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="trabajadores-label">Trabajadores</InputLabel>
      <Controller
        control={control}
        name="personal"
        render={({ field: { onChange } }) => (
          <Select
            labelId="trabajadores-label"
            id="trabajadores-select"
            multiple
            value={selectedTrabajadores}
            onChange={(e) => handleChangeTrabajadores(e, onChange)}
            input={<OutlinedInput label="Trabajadores" />}
            renderValue={(selected) => (
              <div>
                {selected
                  .map((value) => {
                    const trabajador = trabajadores.find((t) => t.id === value)
                    return trabajador ? trabajador.nombre : ''
                  })
                  .join(', ')}
              </div>
            )}
          >
            {trabajadores.map((trabajador) => (
              <MenuItem key={trabajador.id} value={trabajador.id}>
                {trabajador.nombre}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  )
}

export default SelectStaff
