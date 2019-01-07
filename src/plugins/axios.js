import axios from 'axios';
import { apiURL } from '@/api/constants';

export default axios.create({ baseURL: apiURL });
