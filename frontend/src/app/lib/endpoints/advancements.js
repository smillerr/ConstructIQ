const baseUrl = 'http://127.0.0.1:8000/api/v1' //TODO: implement via .env file

export const advancements = {
  getAllAdvancements: `${baseUrl}/avances/`,
  getAdvancementById: (id) => `${baseUrl}/avances/${id}/`,
  createAdvancement: `${baseUrl}/avances/`,
  updateAdvancement: (id) => `${baseUrl}/avances/${id}/`,
  deleteAdvancement: (id) => `${baseUrl}/avances/${id}/`,
  uploadImage: (id) => `${baseUrl}/upload-avance/${id}/`,
}
