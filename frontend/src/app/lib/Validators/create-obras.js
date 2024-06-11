import * as yup from 'yup'

const requiredField = 'Este campo es obligatorio'
const maxCharacters = (max) => {
  return `Este campo no puede exceder ${max} caracteres`
}
const validDate = 'La fecha no es válida'
const obraSchema = yup.object({
  nombre: yup.string().required(requiredField).max(50, maxCharacters(50)),
  descripcion: yup.string().required(requiredField),
  ubicacion: yup.mixed().nullable(true),
  estado: yup.string().required(requiredField),
  id_director: yup.number(requiredField).required(requiredField),
  tipo_obra: yup
    .string()
    .required(requiredField)
    .oneOf(
      [
        'escuela',
        'colegio',
        'conjunto residencial',
        'torre de apartamentos',
        'vial',
        'edificio',
        'tienda',
        'casa',
        'hospital',
        'fábrica',
        'otros',
      ],
      requiredField,
    ),
  fecha_inicio: yup.date().typeError(validDate).required(requiredField),
  fecha_final: yup.date().typeError(validDate).required(requiredField),
  img_obra: yup
    .mixed()
    .required(requiredField)
    .test('fileSize', 'El archivo es muy grande', (value) => {
      return value && value[0]?.size <= 5000000
    })
    .test('fileType', 'El archivo no es una imagen', (value) => {
      return value && value[0]?.type.includes('image')
    }),
})

export default obraSchema
