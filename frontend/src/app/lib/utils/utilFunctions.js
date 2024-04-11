import { users } from '../endpoints/users'

export const fetchData = async (
  url,
  method = 'GET',
  body = {},
  contentType = 'application/json',

  abortController,
) => {
  const handleError = (error) => {
    throw error
  }
  abortController = new AbortController()
  const abortSignal = abortController.signal
  let options = {
    method,
    headers: {
      'Content-Type': contentType,
    },
    signal: abortSignal,
  }
  if (method === ('POST' || 'PATCH' || 'PUT')) {
    options = {
      ...options,
      body,
    }
  }
  try {
    const response = await fetch(url, options)
    return response.json()
  } catch (error) {
    handleError(error)
  }
}

export const handleCreateUserForm = async (data, routingCallback) => {
  if (data?.foto_perfil.length === 0) {
    delete data.foto_perfil
  }

  await createUser(data)
  routingCallback('/home/usuarios')
}

export const createUser = async (userData) => {
  const url = users.createUser
  const method = 'POST'
  const body = JSON.stringify(userData)
  return await fetchData(url, method, body)
}

export const listUser = async () => {
  const url = users.getAllUsers
  try {
    const res = await fetch(url, { cache: 'no-cache' })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
