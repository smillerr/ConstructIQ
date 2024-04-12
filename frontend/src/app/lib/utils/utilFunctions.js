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

export const handleUserLogin = async (formData, routingCallback) => {
  const url = users.authUser
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  const data = await response.json()
  if (data.access) {
    localStorage.setItem('token', data.access)
    routingCallback('/home/usuarios')
  }
}
export const createUser = async (userData) => {
  const url = users.createUser
  const method = 'POST'
  const body = JSON.stringify(userData)
  return await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body,
  })
}

export const deleteUser = async (id) => {
  const url = users.updateUser(id)
  const method = 'PATCH'
  const body = { activo: false }
  return await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body,
  })
}
export const listUser = async () => {
  const url = users.getAllUsers
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      cache: 'no-cache',
    })
    if (res.ok) {
      return res.json()
    }
    return []
  } catch (error) {
    console.error(error)
  }
}
