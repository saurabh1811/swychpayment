import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}`;


export const dashboard = defineStore({
    id: 'dashBoard',
    state: () => ({
      users: {}
    }),
    actions: {
        async wallet_bal() {
            this.users = { loading: true };
            fetchWrapper
            .post(`${baseUrl}/get_wallet_bal`, { })
            .then((users) => (this.users = users))
            .catch((error) => (this.users = { error }));
        }
        }
    });
