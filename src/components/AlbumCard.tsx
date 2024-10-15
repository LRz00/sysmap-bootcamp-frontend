import React from 'react';

interface AlbumCardProps {
    imageSrc: string;
    title: string;
    price: string;
    onClick?: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ imageSrc, title, price, onClick }) => {
    return (
        <>
         <div 
            className='relative h-[180px] w-[180px] m-5'
            onClick={onClick} 
            style={{ cursor: onClick ? 'pointer' : 'default' }} 
        >
            <img src={imageSrc} alt="Album Cover" className='h-full w-full object-cover rounded-md' />
            <p className='drop-shadow-lg absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-lg md:text-xl font-bold'>
                {title}
            </p>
            <p className='absolute bottom-2 right-2 text-white text-md md:text-lg font-bold'>
                {price}
            </p>
        </div>
        </>

    );
}

export default AlbumCard;