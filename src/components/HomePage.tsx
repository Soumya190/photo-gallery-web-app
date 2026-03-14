import {useMemo, useReducer, useState,useCallback} from 'react';
import SearchBar from './SearchBar';
import useFetchPhotos from './useFetchPhotos';

const HomePage = () => {
    const [searchData, setSearchData] = useState('');
    const {photos,loading,error} = useFetchPhotos();

    const handleSearch=useCallback((value:string)=>{

        setSearchData(value);
    },[]);

    const filteredData = useMemo(()=>{
        return photos.filter(item=>{
            return item.author.toLowerCase().includes(searchData.toLowerCase());
        })
    },[photos,searchData])

    const reducer = (state:any,action:any)=>{
        if(action.type==='add_fav'){
            const alreadyExists = state.find((item:any) => item.id === action.payload.id);

            if (alreadyExists) {
            alert("Already in favorites!"); 
            return state; 
        }
            const favstate= [...state,action.payload];
            localStorage.setItem('favorites',JSON.stringify(favstate));
            return favstate
        }

        return state;
    }

    const [favImage,dispatch] = useReducer(reducer,[],()=>{
        const saved = localStorage.getItem('favorites');
        return saved? JSON.parse(saved):[];
    });
    console.log(useReducer(reducer,[]));

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
                <SearchBar searchData={searchData} setSearchData={handleSearch} />

                {loading ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className='animate-spin ' viewBox="0 0 512 512" height={20} width={20}><path d="M208 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm0 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM48 208a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm368 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM75 369.1A48 48 0 1 1 142.9 437 48 48 0 1 1 75 369.1zM75 75A48 48 0 1 1 142.9 142.9 48 48 0 1 1 75 75zM437 369.1A48 48 0 1 1 369.1 437 48 48 0 1 1 437 369.1z" /></svg>
                ) : (
                    // {
                    <div className='p-4 md:p-9 min-h-screen'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {filteredData.map((el:any,idx:any)=>{

                                let isClicked = false;

                                favImage.forEach((item:any)=>{
                                    if(item.id==el.id){
                                        isClicked= true;
                                    }
                                })
                                return(
                                    <div key={idx} className='h-70  border border-black rounded p-3 flex gap-2 flex-col'>
                                        <div className="w-full h-48 overflow-hidden rounded">
                                            <img src={el.download_url} alt="image" className='object-cover h-full w-full' />
                                        </div>
                                        <h1>{el.author}</h1>
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>dispatch({type:"add_fav",payload:el})} height={20} width={20} viewBox="0 0 640 640"><path fill={isClicked?"rgb(266,7,7)":"#cbd5e1"} d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" /></svg>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default HomePage;