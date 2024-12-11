import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
const baseUrl = `${import.meta.env.VITE_API_URL}`;
export const TransactionService = {
    async getWalletTransactions()  {
        const resp = await fetchWrapper.post(`${baseUrl}/swychpay/pusd_transaction`, { });
        return resp;
    }

}