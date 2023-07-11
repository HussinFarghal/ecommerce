import { environment } from '../environments/environment';

export const API_CONFIG = {
  login: {
    url: (username: string, password: string) => `${environment.apiBaseUrl}/auth/login`
  },
  content: {
    url: (lang: string) =>
      `https://raw.githubusercontent.com/HussinFarghal/ecommerce/master/content/${lang}.json?timestamp=${new Date().getTime()}`
  },
  productsCategories: {
    url: () => `${environment.apiBaseUrl}/products/categories`
  }
};
