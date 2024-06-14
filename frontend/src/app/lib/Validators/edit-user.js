import * as yup from 'yup'

const requiredField = 'Este campo es obligatorio'
const maxCharacters = (max) => {
  return `Este campo no puede exceder ${max} caracteres`
}
const invalidPhone = 'Número de teléfono inválido'
const invalidId = 'Número de identificación inválido'
const userSchema = yup
  .object({
    nombre: yup.string().required(requiredField).max(50, maxCharacters(50)),
    apellido: yup.string().required(requiredField).max(50, maxCharacters(50)),
    tipo_identificacion: yup
      .string()
      .required(requiredField)
      .max(50, maxCharacters(50)),
    numero_identificacion: yup
      .string()
      .matches(/^[0-9]*$/, invalidId)
      .required(requiredField)
      .max(12, maxCharacters(12)),
    tipo_usuario: yup.string().required(requiredField).max(50),
    genero: yup.string().required(requiredField).max(50),
    celular: yup
      .string()
      .matches(/^[0-9]{10}$/, invalidPhone)
      .required(requiredField)
      .max(10, maxCharacters(10)),
    direccion: yup
      .string()
      .required(requiredField)
      .max(100, maxCharacters(100)),
  })
  .required()

export default userSchema
