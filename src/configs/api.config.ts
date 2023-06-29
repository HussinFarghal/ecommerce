import { environment } from '../environments/environment';

export const API_CONFIG = {
  login: {
    url: (username: string, password: string) => `${environment.apiBaseUrl}/auth/login`
  },
  content: {
    url: 'https://raw.githubusercontent.com/HussinFarghal/ecommerce/master/content/'
  }
};
