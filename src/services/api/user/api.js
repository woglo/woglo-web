import axios from 'axios'
import { BASE_URL } from '../../../constants/urls'

export const api = axios.create({
    withCredentials:true,
    baseURL:`${BASE_URL}/api`
})