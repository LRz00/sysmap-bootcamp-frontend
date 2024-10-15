import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';

function NavBar(){
    const navigate = useNavigate();
    return(
        <>
        <nav className='absolute top-0 left-0 w-full h-20 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-between px-4 z-10'>
                <div className='flex items-center cursor-pointer' onClick={() => navigate('/home')} >
                    <img src={Logo} alt="Logo" className='h-14 ' />
                    <h1 className='text-white font-bold'>BootPlay</h1>
                </div>

                <div className='flex items-center'>
                    <button onClick={() => navigate('/myalbums')} className='m-4 text-sm text-slate-50 underline font-bold hover:text-slate-200'>Meus Discos</button>
                    <button onClick={() => navigate('/mywallet')} className='m-4 text-sm text-slate-50 underline font-bold hover:text-slate-200'>Carteira</button>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
