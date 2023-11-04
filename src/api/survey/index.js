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
