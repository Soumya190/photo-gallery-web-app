import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://picsum.photos/v2/list?limit=30');
        const data = await res.json();
        setData(data);
        console.log(data);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  // console.log(data[0].id);

  return (
    <>
      {data.map((el: any, idx) => {
        return (
          <div key={idx}>
            <h1>{el.id}</h1>
          </div>
        )
      })}
    </>
  )
}

export default App
