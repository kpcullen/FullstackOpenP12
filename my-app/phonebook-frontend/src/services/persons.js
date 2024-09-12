import axios from 'axios'
let baseUrl = '/api/persons'

export function getAll() {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

export function addNewPerson(newObject) {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

export function deletePerson(id) {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export function updatePerson(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}
