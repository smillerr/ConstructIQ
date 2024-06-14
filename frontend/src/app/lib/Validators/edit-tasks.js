import * as yup from 'yup'

const editTasksSchema = yup.object().shape({
  fecha_estimada_fin: yup
    .string()
    .required('La fecha estimada de fin es obligatoria'),
  estado: yup.string().required('El estado es obligatorio'),
  descripcion: yup.string().required('La descripción es obligatoria'),
  capataz_encargado: yup.number().required('Debes seleccionar un capataz'),
  personal_asignado: yup
    .array()
    .of(yup.number().positive('Los IDs del personal deben ser positivos'))
    .min(1, 'Debe asignar al menos un personal'),
})

export default editTasksSchema
