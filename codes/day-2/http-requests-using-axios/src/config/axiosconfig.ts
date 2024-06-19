import Axios from "axios";

const axiosInstance = Axios.create({
    baseURL: 'http://localhost:4000/people',
    timeout: 1000,
    timeoutErrorMessage: 'request timed out'
})
// axiosInstance.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer `
//     return config
// })

export default axiosInstance