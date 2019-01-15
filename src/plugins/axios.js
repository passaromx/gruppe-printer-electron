import axios from 'axios';
import { apiURL } from '@/api/constants';

export const authAxios = axios.create({ baseURL: apiURL });

export default axios.create({ baseURL: apiURL });
