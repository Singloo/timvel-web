/*
 * File: /Users/origami/Desktop/timvel-web/src/utils/httpClient.ts
 * Project: /Users/origami/Desktop/timvel-web
 * Created Date: Tuesday April 30th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday April 30th 2019 9:47:55 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import Axios from 'axios';
import { API_V1 } from './constants';
const headers = {
  app: 'timvel-web',
  platform: 'web',
};
const apiClient = Axios.create({
  timeout: 20000,
  baseURL: API_V1,
  headers,
});

export { apiClient };
