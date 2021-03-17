import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';

import Spinner from './Spinner';
import ErrorContainer from './ErrorContainer';

import '../styles/search.css'

function genreToID(genre) {
    let newGenre = genre.toLowerCase();

    switch (newGenre) {
        case "action":
            return 28;
        case "adventure":
            return 12
        case "animation":
            return 16
        case "comedy":
            return 35
        case "crime":
            return 80
        case "documentary":
            return 99
        case "drama":
            return 18
        case "family":
            return 10751;
        case "fantasy":
            return 14
        case "history":
            return 36
        case "horror":
            return 27
        case "music":
            return 10402
        case "mystery":
            return 9648
        case "romance":
            return 10749
        case "science fiction":
            return 878
        case "tv movie":
            return 10770
        case "thriller":
            return 53
        case "war":
            return 10752
        case "western":
            return 37
        default:
            return 0
    }
}

function Search({ query }) {
    const [ inputQuery, setInputQuery ] = useState(query || "");
    const [ repos, setRepos ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError ] = useState(false);
    const history = useHistory();
  
    useEffect(() => {
      let ignore = false;
      const controller = new AbortController();
      async function fetchSearchResults() {
        let responseBody = {};
        setIsLoading(true);
        setIsError(false);
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=62a02235ee35233799db59dfc966c7c0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${query}`,
            { signal: controller.signal }
          );
          responseBody = await res.json();
        } catch (e) {
          if (e instanceof DOMException) {
            console.log("HTTP request aborted");
          } else {
            setIsError(true);
            console.log(e);
          }
        }
  
        if (!ignore) {
          setRepos(responseBody.results || []);
          setIsLoading(false);
          console.log("== repos:", responseBody.results);
        }
      }
      if (query) {
        fetchSearchResults();
      }
      return () => {
        controller.abort();
        ignore = true;
      };
    }, [ query ]);
  
    return (
      <div>
        <form action="" class="search-bar" onSubmit={(e) => {
          e.preventDefault();
          history.push(`?q=${inputQuery}`);
        }}>
            <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} type="search" name="search" pattern=".*\S.*" required/>
            <button class="search-btn" type="submit">
                <span>Search</span>
            </button>
        </form>
        {/* <form onSubmit={(e) => {
          e.preventDefault();
          history.push(`?q=${inputQuery}`);
        }}>
          <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
          <button type="submit">Search</button>
        </form> */}
        {isError && <ErrorContainer>Error message!</ErrorContainer>}
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className = "movieBox">
            {repos.map(repo => (
              <li key={repo.id} className = "movie">
                <img src = {buildIconURL(repo.poster_path)}></img>
                {/* <p>{repo.title}</p>
                <p>{getDate(repo.release_date)}</p> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  function getDate(release_date){
    var a = new Date(release_date);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var year = a.getFullYear();
 
    // var locTime = a.toLocaleTimeString("en-US");
    var time = month + ' ' + date + ' ' + year
    return (
        <>
        <p>
            {time}
        </p>
        </>
    );
 }

 function buildIconURL(file_path){
    var url = `https://image.tmdb.org/t/p/w200/${file_path}`

    return url;
}

export default Search;
  