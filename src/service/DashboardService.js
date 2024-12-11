import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
const baseUrl = `${import.meta.env.VITE_API_URL}`;
export const DashboardService = {
    async getWalletInfo()  {
        const resp = await fetchWrapper.post(`${baseUrl}/swychpay/wallet_bal`, { });
        return resp;
    },

    async getFiatWalletInfo()  {
        const resp = await fetchWrapper.post(`${baseUrl}/swychpay/get_fiat_wallet_info`, { });
        return resp;
    },

    async getVcardListInfo()  {
        const resp = await fetchWrapper.post(`${baseUrl}/swychpay/get_vcard_list`, { });
        return resp;
    }

}