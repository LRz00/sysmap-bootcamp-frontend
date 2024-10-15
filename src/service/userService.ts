import api from "./axios";
import { LoginResponse } from '../models/loginResponseInterface';
import { NavigateFunction } from 'react-router-dom';


export const handleRegisterInputChange = (
    event: React.ChangeEvent<HTMLInputElement>, 
    setFormState: React.Dispatch<React.SetStateAction<{ name: string, email: string, password: string }>>
) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
        ...prevState,
        [name]: value
    }));
};

export const handleRegisterSubmit = async (
    e: React.FormEvent,
    formData: { name: string, email: string, password: string },  
    setFormError: React.Dispatch<React.SetStateAction<string | null>>,
    navigate: any
) => {
    e.preventDefault();
    setFormError(null);
  
    try {
      const response = await api.post('/users/signUp', formData);
      console.log('Registro bem-sucedido:', response.data);
      navigate('/login');
    } catch (error: unknown) {
      console.error('Erro ao fazer registro');
      setFormError('Falha no registro. Tente novamente.');
    }
}; 


export const handleLoginInputChange = (
    event: React.ChangeEvent<HTMLInputElement>, 
    setFormState: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>
) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
        ...prevState,
        [name]: value
    }));
};

export const handleLoginSubmit = async (
    event: React.FormEvent, 
    formData: { email: string; password: string }, 
    setFormError: React.Dispatch<React.SetStateAction<string | null>>,
    navigate: NavigateFunction
) => {
    event.preventDefault();
    setFormError(null);

    try {
        const response = await api.post<LoginResponse>('/users/auth', formData);
        console.log('Login bem-sucedido:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.id);
        navigate('/home');
    } catch (error: unknown) {
        console.error('Erro ao fazer login:', error);
        setFormError('Falha no login. Verifique suas credenciais ou tente novamente');
    }
};
