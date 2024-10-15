import React from 'react';

interface InfoCardProps {
    imageSrc: string;
    title: string;
    value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ imageSrc, title, value }) => {
    return (
        <>
            <div className='h-[100px] w-[200px] bg-slate-50 rounded-md m-5 flex items-center'>
                <img src={imageSrc} alt="File icon" className='w-[35px] p-2 rounded-full bg-zinc-900' />
                <div className='ml-2'>
                    <p className='font-bold text-sm text-zinc-900'>{title}</p>
                    <p className='text-xl text-zinc-800'>{value}</p>
                </div>
            </div>
        </>

    );
}


export default InfoCard;