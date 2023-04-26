import axios, { AxiosInstance } from 'axios'
import StartonUtils from '../../utils/starton.utils'

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: StartonUtils.getBackURL(),
	headers: { 'Content-type': 'application/json; charset=UTF-8' },
})
