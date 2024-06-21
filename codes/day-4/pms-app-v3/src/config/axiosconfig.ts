import Axios from 'axios'
import { API_BASE_URL } from './constants'

const axiosInstance = Axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
    timeoutErrorMessage: 'request timed out'
})

axiosInstance.interceptors.request.use(
    (requestConfig) => {
        const token = localStorage.getItem('token')
        if (token) {
            const copy = { ...requestConfig }
            copy.headers.Authorization = `Bearer ${token}`
            return copy
        } else
            return requestConfig
    },
    (err) => {
        return Promise.reject(err.message)
    }
)

export default axiosInstance