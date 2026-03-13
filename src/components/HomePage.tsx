import React, { useEffect, useReducer, useState } from 'react';
import SearchBar from './SearchBar';

const HomePage = () => {
    // const [text, setText] = useState('');
    const [showImg, setShowImg] = useState(true);
    const [data, setData] = useState<any[]>([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>('');
    const [searchData, setSearchData] = useState('');
    const [filterdData,setFilteredData] = useState<any[]>([]);


    useEffect(() => {
        setTimeout(() => {
            setShowImg(false);
            const fetchData = async () => {
                try {
                    const res = await fetch(`https://picsum.photos/v2/list?limit=30`);
                    const data = await res.json();
                    setData(data);
                    // setLoading(false);
                    // console.log(data);
                }
                catch (error: any) {
                    console.log("Err :", error);
                    setError(error);
                    // setLoading(false);
                }
            }

            fetchData();
        }, 3000)
    },[]);

    useEffect(() => {
        let filteredAuthor = data.filter(item => {
            return item.author.toLowerCase().includes(searchData.toLowerCase());
        })

        setFilteredData(filteredAuthor);

    }, [searchData,data])

    if (error) {
        return (
            <div>
                <h1>Error : {error.message}</h1>
            </div>
        )
    }

    return (
        <>
            <div>
                <SearchBar searchData={searchData} setSearchData={setSearchData} />

                {showImg ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={20} width={20}><path d="M208 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm0 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM48 208a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm368 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM75 369.1A48 48 0 1 1 142.9 437 48 48 0 1 1 75 369.1zM75 75A48 48 0 1 1 142.9 142.9 48 48 0 1 1 75 75zM437 369.1A48 48 0 1 1 369.1 437 48 48 0 1 1 437 369.1z" /></svg>
                ) : (
                    // {
                    <div className='grid p-9 gap-3 h-100vh'>
                        <div className='flex flex-wrap gap-10'>
                            {searchData!==''?
                            <>
                            {filterdData.map((el:any,idx:any)=>{
                                return(
                                    <div key={idx} className='h-70 w-80 border border-black rounded p-3 flex gap-2 flex-col'>
                                        <div className="w-full h-48 overflow-hidden rounded">
                                            <img src={el.download_url} alt="image" className='object-cover h-full w-full' />
                                        </div>
                                        <h1>{el.author}</h1>
                                        <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 640 640"><path fill="rgb(246, 7, 7)" d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" /></svg>

                                    </div>
                                )
                            })}
                            </>
                            :
                            <>
                            {data.map((el: any, idx) => {
                                return (
                                    <div key={idx} className='h-70 w-80 border border-black rounded p-3 flex gap-2 flex-col'>
                                        <div className="w-full h-48 overflow-hidden rounded">
                                            <img src={el.download_url} alt="image" className='object-cover h-full w-full' />
                                        </div>
                                        <h1>{el.author}</h1>
                                        <svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} onClick={()=>console.log(el.download_url)} viewBox="0 0 640 640"><path fill="rgb(246, 7, 7)" d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" /></svg>

                                    </div>
                                )
                            })}
                            </>}
                        </div>
                    </div>
                    // }
                )}
            </div>
        </>
    )
}

export default HomePage;