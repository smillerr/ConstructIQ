const baseUrl = 'http://localhost:8000/api/v1' //TODO: implement via .env file

export const users = {
  getAllUsers: `${baseUrl}/usuarios/`,
  getUserById: (id) => `${baseUrl}/usuarios/${id}/`,
  createUser: `${baseUrl}/usuarios/`,
  updateUser: (id) => `${baseUrl}/usuarios/${id}/`,
  deleteUser: (id) => `${baseUrl}/usuarios/${id}/`,
}
