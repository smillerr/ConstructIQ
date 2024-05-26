import { auth } from '../endpoints/authentication'
import { users } from '../endpoints/users'
import { getAccessToken, storeSessionAction } from './actions'

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

export const handleCreateUserForm = async (
  data,
  routingCallback,
  errorCallback,
) => {
  if (data?.foto_perfil?.length === 0) {
    delete data.foto_perfil
  }
  // * Right now this approach is not supported because the backend is not ready to handle this,
  // * but it will be implemented in the future
  if (data?.login === 'N/A') {
    delete data.login
    delete data.password
  }

  await createUser(data, routingCallback, errorCallback)
}
// * This function is temporary, it serves the purpose of generating a random login credential for users with no access to the system, since at the moment, the login field is required
export const generateRandomString = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export const handleEditUserForm = async (
  data,
  routingCallback,
  errorCallback,
) => {
  if (data?.foto_perfil?.length === 0) {
    delete data.foto_perfil
  }
  if (data?.login === 'N/A') {
    // * This approach is temporary, once the backend is ready to handle this, the following line will be removed or changed
  }
  await editUser(data, routingCallback, errorCallback)
}
export const handleUserLogin = async (
  formData,
  routingCallback,
  errorCallback,
) => {
  const url = users.authUser
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (response.status === 401) {
      errorCallback('Usuario o contraseña incorrectos')
    }
    const data = await response.json()
    if (data.access) {
      storeSessionAction(data.access, data.refresh, data.user)
      errorCallback('')
      routingCallback('/home/usuarios')
    }
  } catch (_) {
    const errorMessage = 'Hubo un error al iniciar sesion, intente mas tarde'
    errorCallback(errorMessage)
  }
}
export const createUser = async (userData, routingCallback, errorCallback) => {
  const url = users.createUser
  const method = 'POST'
  const body = JSON.stringify(userData)
  const access_token = await getAccessToken()
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
      },
      body,
    })
    if (res.status === 400) {
      errorCallback(
        'Ya existe un usuario con este login, por favor intente con otro',
      )
    }
    if (res.ok) {
      errorCallback('')
      routingCallback('/home/usuarios')
      return await res.json()
    }
  } catch (_) {
    const errorMessage = 'Hubo un error al crear el usuario, intente mas tarde'
    errorCallback(errorMessage)
  }
}

export const deleteUser = async (id) => {
  const url = users.updateUser(id)
  const method = 'DELETE'
  const access_token = await getAccessToken()
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (error) {
    console.error('error', error)
  }
  return
}
export const listUser = async () => {
  const url = users.getAllUsers
  const access_token = await getAccessToken()
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-cache',
    })
    if (res.ok) {
      return await res.json()
    }
    return []
  } catch (error) {
    console.error('error', error)
  }
}

export const getUser = async (id) => {
  const url = users.getUserById(id)
  const access_token = await getAccessToken()
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-cache',
    })
    if (res.ok) {
      return await res.json()
    }
    return {}
  } catch (error) {
    console.error(error)
  }
}

export const editUser = async (userData, routingCallback, errorCallback) => {
  const url = users.updateUser(userData.id)
  const method = 'PUT'
  const body = JSON.stringify(userData)
  const access_token = await getAccessToken()
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body,
    })
    if (res.ok) {
      errorCallback('')
      routingCallback('/home/usuarios')
      return await res.json()
    }
  } catch (_) {
    const errorMessage = 'Hubo un error al editar el usuario, intente mas tarde'
    errorCallback(errorMessage)
  }
}

export const refreshToken = async (refresher) => {
  const url = auth.refreshToken
  const method = 'POST'
  const body = JSON.stringify({ refresh: refresher })
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  if (res.ok) {
    return { res: await res.json(), valid: true }
  }
  return { res: {}, valid: false }
}

export const dashboardPaths = (userType) => {
  let url = ''
  switch (userType) {
    case 'Gerente':
      url = '/home/gerente'
      break
    case 'Director de obra':
      url = '/home/director'
      break
    case 'Capataz de obra':
      return '/home/capataz'
    default:
      url = '/'
  }
  return url
}
