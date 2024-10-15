// src/pages/MyCollection.tsx
import { useState, useEffect } from 'react';
import Dollar from '../assets/dollar-sign.png';
import File from '../assets/file-video.png';
import InfoCard from '../components/InfoCard';
import AlbumCard from '../components/AlbumCard';
import NavBar from '../components/NavBar';
import { fetchUserAlbums } from '../service/albumService';

function MyCollection() {
    const [albums, setAlbums] = useState([]);
    const [totalAlbums, setTotalAlbums] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    const getUserAlbums = async () => {
        try {
            const { userAlbums, totalAlbums, totalValue } = await fetchUserAlbums();
            setAlbums(userAlbums);
            setTotalAlbums(totalAlbums);
            setTotalValue(totalValue);
        } catch (error) {
            console.error('Erro ao buscar álbuns do usuário:', error);
        }
    };

    useEffect(() => {
        getUserAlbums();
    }, []);

    return (
        <>
            <div className='flex-col'>
                <NavBar />

                <div className='bg-zinc-900 min-h-screen pt-24 px-8'>
                    <h1 className='text-white text-4xl font-medium mb-8'>
                        Meus Discos:
                    </h1>

                    {/* Cards de Total de Albums e Valor Investido */}
                    <div className='flex mb-8'>
                        <InfoCard
                            imageSrc={File}
                            title='Total de Albums'
                            value={totalAlbums.toString()} 
                        />

                        <InfoCard
                            imageSrc={Dollar}
                            title='Valor Investido'
                            value={`R$${totalValue.toFixed(2)}`}
                        />
                    </div>

                    {/* Exibição dos álbuns */}
                    <div className='flex flex-wrap'>
                        {albums.map((album: any, index: number) => (
                            <AlbumCard
                                key={index}
                                imageSrc={album.image_url}
                                title={album.name}
                                price={`R$${album.value.toFixed(2)}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyCollection;
