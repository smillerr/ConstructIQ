'use client'
// import { Controller, useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import ErrorMessage from '../common/Forms/ErrorMessage'
// import { useRouter } from 'next/navigation'
// import { errorInputClasses } from '@/lib/utils/commonStyles'
// import { listUser, listUsersByRole } from '@/lib/utils/utilFunctions'
// import React, { useEffect, useState } from 'react'

// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
// } from '@mui/material'
// import editTaskForm from '@/lib/Validators/edit-tasks'

// const EditTaskForm = () => {
//   const schema = editTaskForm
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     control,
//   } = useForm({
//     resolver: yupResolver(schema),
//   })

//   const handleEditTask = async (data) => {
//     const tareaData = {
//       ...data,
//       obra_personal: {
//         personal: personal,
//       },
//     }
//     const editTask = await updateTask(tareaData, obraData.nombre)

//     const router = useRouter()
//     const [loading, setLoading] = useState(true)
//     const [capataces, setCapataces] = useState([])
//     const [trabajadores, setTrabajadores] = useState([])

//     useEffect(() => {
//       const fetchData = async () => {
//         setLoading(true)

//         const taskData = await getTask(id)

//         setValue('fecha_asignacion', taskData.fecha_asignacion)
//         setValue('fecha_estimada_fin', taskData.fecha_estimada_fin)
//         setValue('estado', taskData.estado)
//         setValue('tipo_tarea', taskData.tipo_tarea)
//         setValue('descripcion', taskData.descripcion)
//         setValue('id_capataz', taskData.id_capataz)
//         setValue(
//           'personal',
//           taskData.personal.map((t) => t.id),
//         )

//         try {
//           const allUsers = await listUser()
//           const capatacesData = await listUsersByRole(
//             allUsers,
//             'Capataz de obra',
//           )
//           setCapataces(capatacesData)

//           const peonesData = await listUsersByRole(allUsers, 'Peón')
//           const ayudantesAlbañilData = await listUsersByRole(
//             allUsers,
//             'Ayudante de albañil',
//           )
//           const trabajadoresData = [...peonesData, ...ayudantesAlbañilData]
//           setTrabajadores(trabajadoresData)

//           setLoading(false)
//         } catch (error) {
//           console.error('Error al obtener los datos:', error)
//         }
//       }

//       fetchData()
//     }, [])

//     const [selectedTrabajadores, setSelectedTrabajadores] = useState([])

//     const handleChangeTrabajadores = (event, onChange) => {
//       const value = event.target.value
//       onChange(value)
//       setSelectedTrabajadores(value)
//     }

//     return (
//       <section className="bg-white">
//         <div className="container flex-grow justify-center min-h-screen px-6 mx-auto">
//           <form
//             className="h-full"
//             onSubmit={handleSubmit(
//               (data) => {
//                 console.log(data)
//               },
//               (err) => console.log(err),
//             )}
//           >
//             <section className="w-full grid grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="fecha_asignacion"
//                   className="text-gray-700 font-semibold mb-2"
//                 >
//                   Fecha de Asignación
//                 </label>
//                 <div className="relative flex items-center mt-2">
//                   <input
//                     id="fecha_asignacion"
//                     type="date"
//                     className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${
//                       errors.fecha_asignacion?.message
//                         ? errorInputClasses
//                         : `focus:border-blue-400 focus:ring-blue-300`
//                     } focus:outline-none focus:ring focus:ring-opacity-40`}
//                     {...register('fecha_asignacion')}
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="fecha_estimada_fin"
//                   className="text-gray-700 font-semibold mb-2"
//                 >
//                   Fecha Estimada de Fin
//                 </label>
//                 <div className="relative flex items-center mt-2">
//                   <input
//                     id="fecha_estimada_fin"
//                     type="date"
//                     className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${
//                       errors.fecha_estimada_fin?.message
//                         ? errorInputClasses
//                         : `focus:border-blue-400 focus:ring-blue-300`
//                     } focus:outline-none focus:ring focus:ring-opacity-40`}
//                     {...register('fecha_estimada_fin')}
//                   />
//                 </div>
//               </div>

//               <div className="relative flex items-center mt-4">
//                 <select
//                   {...register('estado')}
//                   className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${errors.tipo_identificacion?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
//                 >
//                   <option value="">Estado</option>
//                   <option value="asignada">Asignada</option>
//                   <option value="en_desarrollo">En desarrollo</option>
//                   <option value="en_revision">En revision </option>
//                   <option value="aceptada">Aceptada</option>
//                 </select>
//                 <ErrorMessage message={errors.estado?.message} />
//               </div>

//               <div className="relative flex items-center mt-4">
//                 <select
//                   {...register('tipo_tarea')}
//                   className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 ${errors.tipo_identificacion?.message ? errorInputClasses : `focus:border-blue-400  focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
//                 >
//                   <option value="">Tipo de tarea</option>
//                   <option value="obra_negra">Obra Negra</option>
//                   <option value="obra_gris">Obra Gris</option>
//                   <option value="obra_blanca">Obra Blanca </option>
//                 </select>
//                 <ErrorMessage message={errors.tipo_tarea?.message} />
//               </div>

//               <div className="flex flex-col">
//                 <textarea
//                   className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 ${errors.descripcion?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
//                   placeholder="Descripción"
//                   {...register('descripcion')}
//                 ></textarea>
//                 <ErrorMessage message={errors.descripcion?.message} />
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="obra"
//                   className="text-gray-700 font-semibold mb-2"
//                 >
//                   Obra
//                 </label>
//               </div>

//               <div className="w-full flex flex-col justify-center mt-4 md:mt-0">
//                 <section className="bg-white">
//                   {loading ? (
//                     <div>Cargando...</div>
//                   ) : (
//                     <div>
//                       <select
//                         {...register('id_capataz')}
//                         className={`block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 ${errors.id_capataz?.message ? errorInputClasses : `focus:border-blue-400 focus:ring-blue-300`} focus:outline-none focus:ring focus:ring-opacity-40`}
//                       >
//                         <option value="">Seleccione un capataz</option>
//                         {capataces.map((capataz) => (
//                           <option key={capataz.id} value={capataz.id}>
//                             {capataz.nombre}
//                           </option>
//                         ))}
//                       </select>
//                       <ErrorMessage message={errors.id_capataz?.message} />
//                     </div>
//                   )}
//                 </section>
//               </div>

//               <FormControl sx={{ width: '100%' }}>
//                 <InputLabel id="trabajadores-label">Trabajadores</InputLabel>
//                 <Controller
//                   control={control}
//                   name="personal"
//                   render={({ field: { onChange } }) => (
//                     <Select
//                       labelId="trabajadores-label"
//                       id="trabajadores-select"
//                       multiple
//                       value={selectedTrabajadores}
//                       onChange={(e) => handleChangeTrabajadores(e, onChange)}
//                       input={<OutlinedInput label="Trabajadores" />}
//                       renderValue={(selected) => (
//                         <div>
//                           {selected
//                             .map((value) => {
//                               const trabajador = trabajadores.find(
//                                 (t) => t.id === value,
//                               )
//                               return trabajador ? trabajador.nombre : ''
//                             })
//                             .join(', ')}
//                         </div>
//                       )}
//                     >
//                       {trabajadores.map((trabajador) => (
//                         <MenuItem key={trabajador.id} value={trabajador.id}>
//                           {trabajador.nombre}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//                 <ErrorMessage message={errors.personal?.message} />
//               </FormControl>
//             </section>

//             <button
//               className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
//               type="submit"
//             >
//               Crear Tarea
//             </button>
//           </form>
//         </div>
//       </section>
//     )
//   }
// }
// export default EditTaskForm
