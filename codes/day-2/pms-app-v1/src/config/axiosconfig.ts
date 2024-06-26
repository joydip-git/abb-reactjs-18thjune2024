import Axios from 'axios'
import { API_BASE_URL } from './constants'

const axiosInstance = Axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000,
    timeoutErrorMessage: 'request timed out'
})
export default axiosInstance