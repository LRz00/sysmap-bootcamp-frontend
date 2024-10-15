// src/service/albumService.ts
import { toast } from 'react-toastify';
import api from './axios';
import { Album } from '../models/albumInterface';

export const fetchAlbums = async (query: string): Promise<Album[]> => {
    const token = localStorage.getItem('token');
    try {
        const response = await api.get(`/albums/all?search=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const albumsData = response.data.map((album: any) => ({
            title: album.name,
            price: `R$${album.value}`,
            cover: album.images[0]?.url || '',
            id: album.id,
            artists: album.artists,
            externalUrls: album.externalUrls,
            releaseDate: album.releaseDate,
            albumType: album.albumType
        }));

        return albumsData;
    } catch (error) {
        console.error('Erro ao buscar álbuns:', error);
        toast.error('Erro ao buscar álbuns.');
        throw error;
    }
};

export const handleBuyAlbum = async (selectedAlbum: Album | null, closeModal: () => void) => {
    if (!selectedAlbum) return;

    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
        toast.error('Você precisa estar autenticado para comprar um álbum.');
        return;
    }

    const albumData = {
        album: {
            albumType: selectedAlbum.albumType,
            artists: selectedAlbum.artists.map(artist => ({
                externalUrls: artist.externalUrls,
                href: artist.href,
                id: artist.id,
                name: artist.name,
                type: artist.type,
                uri: artist.uri
            })),
            externalUrls: selectedAlbum.externalUrls,
            id: selectedAlbum.id,
            images: [
                {
                    height: 0,
                    url: selectedAlbum.cover,
                    width: 0
                }
            ],
            name: selectedAlbum.title,
            releaseDate: selectedAlbum.releaseDate,
            type: selectedAlbum.albumType,
            value: parseFloat(selectedAlbum.price.replace('R$', ''))
        },
        user_id: userId
    };

    try {
        const response = await api.post('/albums/sale', albumData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Compra realizada com sucesso:', response.data);
        toast.success('Álbum comprado com sucesso!');
        closeModal();
    } catch (error) {
        console.error('Erro ao comprar o álbum:', error);
        toast.error('Ocorreu um erro ao tentar comprar o álbum.');
    }
};

export const fetchUserAlbums = async () => {
    const userId = localStorage.getItem('id');  
    const token = localStorage.getItem('token'); 

    try {
        const response = await api.get(`/albums/my-collection/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,  
            },
        });

        const userAlbums = response.data.filter((album: any) => !album.deleted_at);
        const totalAlbums = userAlbums.length;
        const totalValue = userAlbums.reduce((sum: number, album: any) => sum + album.value, 0);

        return { userAlbums, totalAlbums, totalValue };
    } catch (error) {
        console.error('Erro ao buscar álbuns do usuário:', error);
        throw error;
    }
};
