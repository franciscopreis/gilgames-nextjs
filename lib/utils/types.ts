// Tipagem para as respostas da API
export interface SuccessResponse<T> {
  success: true
  data: T
}

export interface ErrorResponse {
  success: false
  error: string | object | unknown
}
