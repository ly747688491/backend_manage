export interface Result {
  code: number
  message: string
  success?: boolean
}

export interface PageResponse<T = any> extends Result {
  data: {
    page: number
    limit: number
    total: number
    data: T
  }
}

export interface DetailResponse<T = any> extends Result {
  data: T
}

export interface ErrorResponse extends Result {
  data: any
}
