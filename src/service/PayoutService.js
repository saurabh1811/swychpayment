import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
const baseUrl = `${import.meta.env.VITE_API_URL}`;
const mainApiUrl = `${import.meta.env.VITE_MAIN_API_URL}`;
export const PayoutService = {
    async getPayoutCountry()  {
        const resp = await fetchWrapper.post(`${baseUrl}/swychpay/payout_methods`, { });
        return resp;
    },
    async postPayoutCreation(params)  {
        const resp = await fetchWrapper.post(`${mainApiUrl}/create_transaction`, params);
        return resp;
    },
}