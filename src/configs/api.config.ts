import { environment } from '../environments/environment';

export const API_CONFIG = {
  login: {
    url: (email: string, password: string) =>
      `${environment.authAPIUrl}/auth/login`,
  },
  register: {
    url: (
      name: string,
      email: string,
      password: string,
      avatar: string,
      role: string
    ) => `${environment.authAPIUrl}/users`,
  },
};
