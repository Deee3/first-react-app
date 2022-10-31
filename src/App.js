//omdb api key  fe7d716f
import React from 'react';
import './App.css';
//lets us load the API key off the rip
import { useEffect } from 'react';
import { useState } from 'react';

import MovieCard from './movieCard';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=fe7d716f'



const App = () => {
    //need to map movies from data to MovieCard component
    //need to define new State
    const [movies, setMovies] = useState([]);

    //new state to get search function to work
    //replace input's value to {searchTerm}
    //to be able to type/ change: onchange to have run setSearchTerm(e.target.value)
    const [searchTerm, setSearchTerm] = useState('');

    //this async function calls the API and gets the data object
    const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    //return data.results;
    //data.Search only returns the array, THATS NEWWWW
    setMovies(data.Search);
    console.log(data.Search)
//input tags in react needs a placeholder and value, need onChange with function to change the value
    }
    useEffect(() => {
        searchMovies('Mad Max');
    }, []);

    return ( 
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={() => {searchMovies(searchTerm)}}
                />
            </div>

            {movies?.length > 0 
                ? ( 
                  <div className='container'>
                    {movies.map((movie, i) => (
                       <MovieCard movie={movie} key={i}/>
                    ))}
                </div>
                ) : (
                   <div className='empty'>
                      <h2>No Movies Found</h2>
                   </div>
                 )}
        </div>  
    );
}

//must export components to call it somewhere else in folder
export default App;

