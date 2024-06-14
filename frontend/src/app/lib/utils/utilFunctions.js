import { advancements } from '../endpoints/advancements'
import { auth } from '../endpoints/authentication'
import { constructions } from '../endpoints/constructions'
import { tasks } from '../endpoints/tasks'
import { users } from '../endpoints/users'
import { getAccessToken, storeSessionAction } from './actions'
import {
  directorHasAccess,
  foremanHasAccess,
} from './authorization/constructions/permissions'
import { foremanHasTaskAccess } from './authorization/tasks/permissions'
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
  const foto_perfil = data.foto_perfil[0]
  if (data?.foto_perfil?.length === 0) {
    delete data.foto_perfil
  }
  if (data?.login === 'N/A') {
    delete data.login
  }
  const createdUser = await createUser(data, errorCallback)
  if (createdUser) {
    await uploadUserProfilePic(createdUser.id, foto_perfil)
    routingCallback('/home/usuarios')
  }
}

export const handleEditUserForm = async (
  data,
  routingCallback,
  errorCallback,
) => {
  delete data?.last_login
  delete data?.user_permissions
  delete data?.groups
  if (data?.foto_perfil?.length === 0) {
    delete data.foto_perfil
  }
  if (data?.password === '') delete data.password
  if (data?.login === 'N/A') {
    delete data.login
  }

  const editedUser = await editUser(data, errorCallback)
  if (editedUser) {
    if (data?.foto_perfil[0])
      await uploadUserProfilePic(editedUser.id, data.foto_perfil[0])
    routingCallback('/home/usuarios')
  }
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
      routingCallback(dashboardPaths(data.user.tipo_usuario))
    }
  } catch (_) {
    const errorMessage = 'Hubo un error al iniciar sesion, intente mas tarde'
    errorCallback(errorMessage)
  }
}
export const createUser = async (userData, errorCallback) => {
  const url = users.createUser
  const method = 'POST'
  const body = new URLSearchParams(userData)
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

export const listUsersByRole = async (userList, tipoUsuario) => {
  const usersByRole = userList?.filter(
    (user) => user.tipo_usuario === tipoUsuario,
  )
  const activeUsersByRole = usersByRole.filter(
    (user) => user.is_active === true,
  )
  return activeUsersByRole
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

export const editUser = async (userData, errorCallback) => {
  const url = users.updateUser(userData.id)
  const method = 'PATCH'
  const body = new URLSearchParams(userData)
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
    if (res.ok) {
      errorCallback('')
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
      url = '/ungranted-access'
  }
  return url
}

export const needsNewToken = (expiresAt) => {
  const currentTime = new Date()
  return currentTime > new Date(expiresAt)
}

export const libs = ['core', 'maps', 'places']

export const getConstruction = async (id) => {
  const url = constructions.getConstructionById(id)
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

export const editConstruction = async (id, constructionData) => {
  const url = constructions.updateConstruction(id)
  const method = 'PATCH'
  const body = JSON.stringify(constructionData)
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
      return await res.json()
    }
  } catch (_) {
    const errorMessage =
      'Hubo un error al editar la construccion, intente mas tarde'
    console.error(errorMessage)
  }
}

export const deleteConstruction = async (id) => {
  const url = constructions.deleteConstruction(id)
  const method = 'DELETE'
  const access_token = await getAccessToken()
  try {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    })
  } catch (error) {
    console.error('error', error)
  }
  return
}

export const createConstruction = async (obraData) => {
  const url = constructions.createConstruction
  const method = 'POST'
  const body = JSON.stringify(obraData)
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
      return await res.json()
    }
  } catch (error) {
    console.error('error', error)
  }
  return
}

export const uploadConstructionImage = async (id, image) => {
  const url = constructions.uploadImage(id)
  const method = 'POST'
  const formData = new FormData()
  formData.append('img_obra', image)
  formData.get('img_obra')

  const access_token = await getAccessToken()
  try {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (error) {
    console.error('error', error)
  }
  return
}

export const uploadUserProfilePic = async (id, image) => {
  const url = users.uploadImage(id)
  const method = 'POST'
  const formData = new FormData()
  formData.append('foto_perfil', image)
  const access_token = await getAccessToken()
  try {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (error) {
    console.error('error', error)
  }
  return
}

export const construcionUrlResolver = (tipoUsuario, id) => {
  let url = ''
  switch (tipoUsuario) {
    case 'Gerente':
      url = `http://localhost:8000/api/v1/obras/`
      break
    case 'Director de obra':
      url = `http://localhost:8000/api/v1/obras/?director=${id}`
      break
    case 'Capataz de obra':
      url = `http://localhost:8000/api/v1/obras/?capataz=${id}`
      break
    default:
  }
  return url
}
export const getConstructionByDirector = async (id) => {
  const url = constructions.getConstructionsByDirector(id)
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
export const getConstructionByForeman = async (id) => {
  const url = constructions.getConstructionsByForeman(id)
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
export const getTasksByConstruction = async (id) => {
  const url = tasks.getTaskByObra(id)
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

export const getTasksByForeman = async (id) => {
  const url = tasks.getTaskByForeman(id)
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

export const hasConstructionAccess = async (userType, userId, obraId) => {
  console.log(userType, userId, obraId)
  switch (userType) {
    case 'Gerente':
      return true
    case 'Director de obra':
      return await directorHasAccess(userId, obraId)
    case 'Capataz de obra':
      return await foremanHasAccess(userId, obraId)
    default:
      return false
  }
}

export const hasTaskAccess = async (userType, userId, taskId) => {
  switch (userType) {
    case 'Gerente':
      return true
    case 'Director de obra':
      return true
    case 'Capataz de obra':
      return await foremanHasTaskAccess(userId, taskId)
    default:
      return false
  }
}

export const createTask = async (taskData) => {
  const url = tasks.createTask
  const method = 'POST'
  const body = JSON.stringify(taskData)
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
      return await res.json()
    }
  } catch (error) {
    console.error('error', error)
  }
  return
}

export const editTask = async (taskId, taskData) => {
  const url = tasks.updateTask(taskId)
  const method = 'PATCH'
  const body = JSON.stringify(taskData)
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
      return await res.json()
    }
  } catch (error) {
    console.error('error', error)
  }
  return
}
export const handleEditTask = async (
  taskData,
  taskId,
  relatedConstruction,
  routingCallback,
) => {
  await editTask(taskId, taskData)
  routingCallback(`/home/obras/${relatedConstruction}`)
}
export const handleCreateTask = async (
  taskData,
  relatedConstruction,
  routingCallback,
) => {
  await createTask(taskData)
  routingCallback(`/home/obras/${relatedConstruction}`)
}

export const getTask = async (id) => {
  const url = tasks.getTaskById(id)
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

export const deleteTask = async (id) => {
  const url = tasks.deleteTask(id)
  const method = 'DELETE'
  const access_token = await getAccessToken()
  try {
    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    })
  } catch (error) {
    console.error('error', error)
  }
  return
}

export const getAdvancement = async (id) => {
  const url = advancements.getAdvancementById(id)
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

export const getAdvancements = async () => {
  const url = advancements.getAllAdvancements
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

export const handleCreateAvance = async (
  avanceData,
  relatedConstruction,
  routingCallback,
) => {
  const createdAvance = await createAvance(avanceData)
  if (createdAvance) {
    await uploadAvancePic(createdAvance.id, avanceData?.img_avance[0])
  }
  routingCallback(`/home/tareas/${relatedConstruction}`)
}

export const createAvance = async (taskData) => {
  const url = advancements.createAdvancement
  const method = 'POST'
  const body = JSON.stringify(taskData)
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
      return await res.json()
    }
  } catch (error) {
    console.error('error', error)
  }
  return
}

export const uploadAvancePic = async (id, image) => {
  const url = advancements.uploadImage(id)
  const method = 'POST'
  const formData = new FormData()
  formData.append('img_avance', image)
  const access_token = await getAccessToken()
  try {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (error) {
    console.error('error', error)
  }
  return
}
