import * as yup from 'yup'

const requiredField = 'Este campo es obligatorio'

const credentialsSchema = yup
  .object({
    username: yup.string().required(requiredField),
    password: yup.string().required(requiredField),
  })
  .required()

export default credentialsSchema
