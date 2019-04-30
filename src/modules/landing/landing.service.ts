/*
 * File: /Users/origami/Desktop/timvel-web/src/modules/landing/landing.service.ts
 * Project: /Users/origami/Desktop/timvel-web
 * Created Date: Tuesday April 30th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday April 30th 2019 9:48:42 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { apiClient } from '../../utils';

class LandingService {
  getAllPosts = () => {
    return apiClient.get('/post/all');
  };
}

export default new LandingService();
export { LandingService };
