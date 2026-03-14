
const SearchBar=(props:any)=>{

    console.log(props.searchData);
    return(
        <>
        <div className="grid p-4 w-full">
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-end sm:pr-5">
                <div className="flex flex-1 sm:flex-none border-2 border-black items-center pl-2 rounded bg-white overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" height={20} width={20}><path fill="rgb(30, 48, 80)" d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z"/></svg>
                    <input type="text" placeholder="Enter your author name" value={props.searchData} onChange={(e:any)=>props.setSearchData(e.target.value)} className="h-9 w-70 pl-2 decoration-none outline-none" />
                </div>

            </div>
        </div>
        </>
    )
}

export default SearchBar;