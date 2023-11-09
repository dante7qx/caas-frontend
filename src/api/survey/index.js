import request from "@/util/request"

export function listPaper(data) {
  return request.post('/survy/list', data)
}

export function getPaper(id) {
  // return request.get('/survy/' + id)
  return request.get('/survy/jpa/' + id)
}

export function persist(data) {
  return request.post('/survy/persist', data)
}

export function deletePaper(id) {
  return request.post('/survy/jpa/delete/' + id)
}

export function getUserPaper(paperId, userId) {
  return request.post(`/survy/user_paper/${paperId}/${userId}`)
}

export function getUserPaperById(id) {
  return request.post(`/survy/user_paper/${id}`)
}

export function persistUser(data) {
  return request.post('/survy/persist_user', data)
}
