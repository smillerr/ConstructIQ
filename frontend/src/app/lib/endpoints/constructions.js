const baseUrl = 'http://127.0.0.1:8000/api/v1' //TODO: implement via .env file

export const constructions = {
  getAllConstructions: `${baseUrl}/obras/`,
  getMyConstructions: `${baseUrl}/mis-obras/`,
  getConstructionById: (id) => `${baseUrl}/obras/${id}/`,
  createConstruction: `${baseUrl}/obras/`,
  updateConstruction: (id) => `${baseUrl}/obras/${id}/`,
  deleteConstruction: (id) => `${baseUrl}/obras/${id}/`,
  uploadImage: (id) => `${baseUrl}/upload-obra/${id}/`,
}
