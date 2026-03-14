
import {useState,useEffect} from "react";

const useFetchPhotos=()=>{
    const[loading,setLoading]= useState(false);
    const [error,setError] = useState<any>(null);
    const [photos,setPhotos] = useState<any[]>([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setLoading(true);
                const res = await fetch('https://picsum.photos/v2/list?limit=30')

                if(!res.ok) throw new Error("Error while fetching the data");
                const data = await res.json();

                setPhotos(data);
            }
            catch(err){
                setError(err);
                setLoading(false);
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    },[]);

    return {photos,loading,error}
}

export default useFetchPhotos;