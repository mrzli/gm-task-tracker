import axios from 'axios';
import { getAppEnv } from '../../setup/app-env';

export const restApi = axios.create({
  baseURL: getAppEnv().REACT_APP_REST_API,
});
