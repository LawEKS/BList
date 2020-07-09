import axios from "axios"

export const bookAPI = axios.create({
  baseURL: "http://nyx.vima.ekt.gr:3000/api/",
})
