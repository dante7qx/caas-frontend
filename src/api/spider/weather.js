import request from "@/util/request"

export function listCity(data) {
  return request.post('/weather/list_city', data)
}

export function getCityWeather(code) {
  return request.post('/weather/' + code)
}
