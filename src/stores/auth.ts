import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchToken } from '@/utils/helpers/fetch-token';

const baseUrl = `${import.meta.env.VITE_API_URL}`;
console.log(baseUrl)

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(email: string, password: string) {
      console.log(baseUrl)
      const resp = await fetchToken.post(`${baseUrl}/swychpay/auth/login`, { email, password });

    
 
      // update pinia state
      this.user = resp.data;
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(resp.data));
      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/dashboard');
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/auth/login');
    }
  }
});
