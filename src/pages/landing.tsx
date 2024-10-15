import Background from '../assets/background-girl.jpg';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div className='relative min-h-screen'>
        <nav className='absolute top-0 left-0 w-full h-20 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-between px-4 z-10'>
          <div className='flex items-center'>
            <img src={Logo} alt="Logo" className='h-16' />
            <h1 className='text-white font-bold'>BootPlay</h1>
          </div>
          <ul className='flex items-center'>
            <li className='m-4'>
              <button  onClick={() => navigate('/login')} className='bg-black text-white rounded-3xl px-8 py-3 hover:bg-slate-900 '>Entrar</button>
            </li>
            <li className='m-4'>
              <button  onClick={() => navigate('/signup')} className='bg-bbabyblue text-black rounded-3xl px-8 py-3 hover:bg-blue-400'>Inscrever-se</button>
            </li>
          </ul>
        </nav>
        <img src={Background} alt="Background" className='h-screen w-screen object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent'></div>
        <div className='flex-col absolute top-1/2 left-0 transform -translate-y-1/2 p-6 z-10'>
          <h1 className='text-white text-6xl font-bold break-all'>A História da música <br></br>não pode ser esquecida</h1>
          <p className='mt-4 mb-8 text-white text-xl'>Crie já sua conta e curta os sucessos que <br></br>marcaram os tempos do Vinil</p>
          <button  onClick={() => navigate('/signup')} className='my-8 bg-bbabyblue text-black rounded-3xl px-16 py-4'>Inscrever-se</button>
        </div>
      </div>
    </>
  );
}

export default Landing;
