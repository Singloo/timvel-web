/*
 * File: /Users/origami/Desktop/timvel-web/src/utils/constants.ts
 * Project: /Users/origami/Desktop/timvel-web
 * Created Date: Tuesday April 30th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday April 30th 2019 10:26:45 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
let host = window.location.href
if (process.env.NODE_ENV==='development') {
  host = 'https://timvel.com/';
}

export const HOST = host;
export const API_V1 = host + 'api/v1';
