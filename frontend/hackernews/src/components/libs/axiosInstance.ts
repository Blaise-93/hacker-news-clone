import axios from 'axios'

export const baseURL = 'http://localhost:8000/api/'


export const axiostInstance = axios.create(
    {
        baseURL: baseURL,
        timeout:5000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }
)