import InfoCard from "../components/InfoCard";
import NavBar from "../components/NavBar";
import Dollar from '../assets/dollar-sign.png';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWalletId, fetchWalletInfo, fetchTransactions, addCredit } from '../service/walletService';

function Wallet() {
    const [walletId, setWalletId] = useState<string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [points, setPoints] = useState<number | null>(null);
    const [amount, setAmount] = useState<number | string>("");
    const [transactions, setTransactions] = useState<any[]>([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('id');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const walletId = await fetchWalletId(userId, token);
                setWalletId(walletId);

                const walletInfo = await fetchWalletInfo(walletId, token);
                setBalance(walletInfo.balance);
                setPoints(walletInfo.points);

                const userTransactions = await fetchTransactions(userId, token);
                setTransactions(userTransactions);
            } catch (error) {
                console.error("Erro ao carregar dados da carteira e transações:", error);
            }
        };

        fetchData();
    }, [navigate]);

    const handleAddCredit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        if (walletId && token) {
            try {
                const creditValue = parseFloat(amount as string);

                if (isNaN(creditValue) || creditValue <= 0) {
                    alert('Por favor, insira um valor válido de crédito.');
                    return;
                }

                await addCredit(walletId, creditValue, token);
                setBalance(prev => (prev !== null ? prev + creditValue : creditValue));
                setAmount(""); 
            } catch (error) {
                console.error("Erro ao adicionar crédito:", error);
            }
        }
    };

    return (
        <>
            <div className='flex-col'>
                <NavBar />
                <div className='bg-zinc-900 min-h-screen pt-24 px-8'>
                    <h1 className='text-white text-4xl font-medium mb-8'>Adicionar crédito:</h1>
                    <form onSubmit={handleAddCredit}>
                        <label htmlFor="amount" className='text-white font-bold text-sm'>Valor:</label>
                        <div className='flex space-x-4'>
                            <input
                                name="amount"
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)} 
                                placeholder="Digite o valor"
                                className='w-full p-3 ring-1 ring-slate-900/20 rounded-lg'
                                min="0" 
                            />
                            <button className='bg-amber-500 text-white rounded-3xl px-6 py-2 hover:bg-amber-300 self-center'>
                                Adicionar
                            </button>
                        </div>
                    </form>

                    <div className='h-8'></div>

                    <h2 className='text-white text-3xl font-medium mt-8'>Saldo e Pontos:</h2>
                    <p className='text-white text-lg mt-4'>
                        {balance !== null ? `Saldo: R$${balance.toFixed(2)}` : 'Carregando...'}
                    </p>
                    <p className='text-white text-lg mt-2'>
                        {points !== null ? `Pontos: ${points}` : 'Carregando...'}
                    </p>

                    <h1 className='text-white text-4xl font-medium mb-8'>
                        Minhas Transações:
                    </h1>
                    <div className='flex flex-wrap'>
                        {transactions.map((transaction) => (
                            <InfoCard
                                key={transaction.id}
                                imageSrc={Dollar} 
                                title={transaction.album_name}
                                value={`R$${transaction.value.toFixed(2)}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wallet;
