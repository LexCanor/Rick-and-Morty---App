1
import { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';


function App() {

  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isLoading, hasError] = useFetch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${finder}`;
    getLocation(url);
  }, [finder]);

  //console.log(location);

  const textInput = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    setFinder(textInput.current.value.trim());
  }

  const quantity = 5;
  const second = currentPage * quantity;
  const first = second - quantity;
  const residentsPart = location && location.residents.slice(first, second);
  const totalPage = location && Math.floor(location.residents.length / quantity) + 1;

  return (
    <div className='app'>
      {
        isLoading ?
          <h2>Loading...</h2>
          :
          <>
          <div className='app_img'>
            <img src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/1/AmazonStores/A1AM78C64UM0Y8/98703b33d9d6579765f3fa2cad228a8d.w3000.h600._CR0%2C0%2C3000%2C600_SX1500_.jpg" alt="rick and morty banner" />
          </div>
            <form 
              onSubmit={handleSubmit}
              className='app_form'
            >
              <input 
                className='app_text'
                type="number" 
                ref={textInput} 
                placeholder='type a number (1 to 126)'
              />
              <button className='app_btn'>Search</button>
            </form>
            {
              hasError || finder === '0'?
                <h2>this location do not exist</h2>
                :
                <>
                  <LocationCard
                    location = {location}
                  />
                    <Pagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPage={totalPage}
                    />
                  <div className='app_container'>
                    {
                      residentsPart.map(resident => (
                        <ResidentCard
                          key = {resident}
                          url = {resident}
                        />
                      ))
                    }
                  </div>
                </>
            }
          </>
      }
    </div>
  )
}

export default App;
