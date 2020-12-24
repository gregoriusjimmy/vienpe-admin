import axios from 'axios'

axios.defaults.withCredentials = true

export const fetchGet = async (url) => {
  return await axios.get(url)
}

export const fetchDelete = async (url, dataSend) => {
  return await axios.delete(url, dataSend)
}

export const fetchPost = async (url, dataSend) => {
  return await axios.post(url, dataSend)
}

export const fetchPut = async (url, dataSend) => {
  return await axios.put(url, dataSend)
}

export const getErrorMessage = (error) => {
  let errorMessage
  if (error.response?.data) errorMessage = error.response.data
  else errorMessage = error.message
  return errorMessage
}
