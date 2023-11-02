import request from "@/util/request"

export function getPaper(id) {
  // return request.get('/survy/' + id)
  return request.get('/survy/jpa/' + id)
}

export function persist(data) {
  return request.post('/survy/persist', data)
}
