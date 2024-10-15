import Background from '../assets/background-2.jpeg';
import { useState, useEffect } from 'react';
import AlbumCard from '../components/AlbumCard';
import NavBar from '../components/NavBar';
import { Album } from '../models/albumInterface';
import { fetchAlbums, handleBuyAlbum } from '../service/albumService'; // Importando os métodos

function MainHome() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const [searchQuery, setSearchQuery] = useState('The Killers');

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const albumsData = await fetchAlbums(searchQuery);
                setAlbums(albumsData);
            } catch (error) {
                console.error(error);
            }
        };
        loadAlbums();
    }, [searchQuery]);

    const openModal = (album: Album) => {
        setSelectedAlbum(album);
    };

    const closeModal = () => {
        setSelectedAlbum(null);
    };

    return (
        <>
            <NavBar />

            <div className='relative min-h-screen flex flex-col'>
                <div className='relative h-[60vh] w-full'>
                    <img src={Background} alt="Background" className='h-full w-full object-cover' />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/80 to-transparent'></div>

                    <div className='absolute inset-0 flex flex-col justify-center items-start px-8'>
                        <h1 className='text-white text-4xl sm:text-3xl lg:text-5xl font-bold'>
                            A história da música <br /> não pode ser esquecida!
                        </h1>
                        <p className='text-white text-lg mt-4'>
                            Sucessos que marcaram o tempo!!!
                        </p>
                    </div>
                </div>

                <div className='h-auto w-full bg-zinc-900 flex flex-col justify-center items-center background-blur-sm py-10'>
                    <div className='w-full flex justify-center'>
                        <div className='relative w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3'>
                            <input
                                type='text'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full h-10 rounded-md px-4 text-white bg-zinc-900 ring-1 ring-slate-100'
                                placeholder="Pesquisar álbuns..."
                            />
                            <button
                                onClick={() => fetchAlbums(searchQuery)}
                                className='bg-zinc-900 absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-black rounded-full flex items-center justify-center'>
                                🔍
                            </button>
                        </div>
                    </div>
                    <h2 className='text-white text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 p-4'>Trends</h2>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {albums.map((album, index) => (
                            <AlbumCard
                                key={index}
                                imageSrc={album.cover}
                                title={album.title}
                                price={album.price}
                                onClick={() => openModal(album)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {selectedAlbum && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div className='relative flex' style={{ width: 'calc(2 * 360px)', height: '360px' }}>
                        <button
                            onClick={closeModal}
                            className='absolute top-2 right-2 text-black text-xl font-bold z-20'
                        >
                            &times;
                        </button>
                        <div className='w-[360px] h-full overflow-hidden'>
                            <img
                                src={selectedAlbum.cover}
                                alt={selectedAlbum.title}
                                className='w-full h-full object-cover'
                                style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                            />
                        </div>
                        <div className='bg-white p-8 flex flex-col justify-between flex-1 rounded-r-lg'>
                            <div>
                                <h2 className='text-xl font-bold mb-2'>{selectedAlbum.title}</h2>
                                <p className='text-lg font-bold mb-4'>{selectedAlbum.price}</p>
                            </div>
                            <button 
                                className='bg-amber-500 text-white rounded-3xl px-6 py-2 b-1 hover:bg-amber-300'
                                onClick={() => handleBuyAlbum(selectedAlbum, closeModal)} // Utilizando handleBuyAlbum do serviço
                            >
                                Comprar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MainHome;
