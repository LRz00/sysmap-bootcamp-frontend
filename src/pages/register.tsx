import Background from '../assets/background-girl.jpg';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { handleRegisterInputChange, handleRegisterSubmit } from '../service/userService';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleRegisterInputChange(event, setFormData);
    };

    const handleSubmit = (event: React.FormEvent) => {
        handleRegisterSubmit(event, formData, setFormError, navigate);
    };

    return (
        <>
            <img src={Background} alt="Background" className='h-screen w-screen object-cover' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent backdrop-blur-md'></div>

            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center min-w-[480px] p-10 bg-white rounded-lg'>
                <div className='w-full'>
                    <img src={Logo} alt="Logo" className='h-16 mx-auto' />
                    <h1 className='text-black font-semibold text-center text-3xl'>Criar conta</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
                        <label htmlFor="name" className='text-black text-sm'>Nome Completo:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className='w-full p-3 ring-1 ring-slate-900/20 rounded-lg'
                        />
                        <label htmlFor="email" className='text-black text-sm'>Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className='w-full p-3 ring-1 ring-slate-900/20 rounded-lg'
                        />
                        <label htmlFor="password" className='text-black text-sm'>Senha:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className='w-full p-3 ring-1 ring-slate-900/20 rounded-lg'
                        />
                        {formError && <p className='text-red-500 text-sm'>{formError}</p>}
                        <button type="submit" className='my-8 bg-black text-white rounded-3xl px-16 py-4'>Criar conta</button>
                    </form>
                    <p className='text-sm text-slate-500'>Já tem uma conta? <button onClick={() => navigate('/login')} className='text-sm text-slate-950 underline'>Entrar</button></p>
                </div>
            </div>
        </>
    );
}

export default Register;
