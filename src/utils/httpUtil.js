import { httpBase } from './httpBaseUtil'

export const fetch = (apiUrl, endpoint, params = null, token = null) => {
    return httpBase(apiUrl, token).get(endpoint, { params })
}

export const store = (apiUrl, endpoint, data, token = null) => {
    return httpBase(apiUrl, token).post(endpoint, data)
}

export const update = (apiUrl, endpoint, data, token = null) => {
    return httpBase(apiUrl, token).put(endpoint, data)
}

export const destroy = (endpoint) => {
    return httpBase().delete(endpoint)
}