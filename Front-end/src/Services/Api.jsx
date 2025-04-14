import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5062",
    timeout: 10000
})