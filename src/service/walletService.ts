import api from './axios';

export const fetchWalletId = async (userId: string, token: string) => {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.wallet_id;
    } catch (error) {
        console.error("Erro ao obter o ID da carteira:", error);
        throw error;
    }
};

export const fetchWalletInfo = async (walletId: string, token: string) => {
    try {
        const response = await api.get(`/wallet/${walletId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao obter informações da carteira:", error);
        throw error;
    }
};

export const fetchTransactions = async (userId: string, token: string) => {
    try {
        const response = await api.get(`/transactions/users/transactions/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao obter transações:", error);
        throw error;
    }
};

export const addCredit = async (walletId: string, creditValue: number, token: string) => {
    try {
        const response = await api.post('/wallet/credit', {
            credit: creditValue,
            wallet_id: walletId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar crédito:", error);
        throw error;
    }
};
