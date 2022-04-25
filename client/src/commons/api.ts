import axios from "axios"
// http://localhost:5500/api
const url =
  process.env.NODE_ENV !== "production"
    ? "https://protected-oasis-28404.herokuapp.com/api"
    : "https://protected-oasis-28404.herokuapp.com/api"

export default axios.create({
  baseURL: url,
})
