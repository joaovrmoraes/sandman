import axios from "axios"

export const apiIsntance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})