import axios from 'axios';

import { ENV } from '~/libs/enums/enums.js';

const axiosInstance = axios.create({
  baseURL: ENV.SERVER_URL
});

export { axiosInstance };
