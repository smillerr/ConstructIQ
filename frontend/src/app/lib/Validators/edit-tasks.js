import * as yup from 'yup'

const createTasksSchema = yup.object().shape({
  fecha_asignacion: yup
    .string()
    .required('La fecha de asignación es obligatoria'),
  fecha_estimada_fin: yup
    .string()
    .required('La fecha estimada de fin es obligatoria'),
  estado: yup.string().required('El estado es obligatorio'),
  tipo_tarea: yup.string().required('El tipo de tarea es obligatorio'),
  descripcion: yup.string().required('La descripción es obligatoria'),

  id_capataz: yup.number().required('El ID del capataz es obligatorio'),
  personal_asignado: yup
    .array()
    .of(yup.number().positive('Los IDs del personal deben ser positivos'))
    .min(1, 'Debe asignar al menos un personal'),
})

export default createTasksSchema
