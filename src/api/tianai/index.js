import request from "@/util/request"

export function generate() {
  return request.get('/tianai/generate')
}

