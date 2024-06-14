const baseUrl = 'http://127.0.0.1:8000/api/v1' //TODO: implement via .env file

export const tasks = {
  getAllTasks: `${baseUrl}/tareas/`,
  getTaskById: (id) => `${baseUrl}/tareas/${id}/`,
  getTaskByObra: (id) => `${baseUrl}/tareas/?obra=${id}`,
  getTaskByForeman: (id) => `${baseUrl}/tareas/?capataz=${id}`,
  createTask: `${baseUrl}/tareas/`,
  updateTask: (id) => `${baseUrl}/tareas/${id}/`,
  deleteTask: (id) => `${baseUrl}/tareas/${id}/`,
}
