
import axios from 'axios';
import { baseURL } from '../constants/constants';
import {useSelector} from 'react-redux';


const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  // headers: {'Authorization': `Bearer ${token} `}
});

export default instance;