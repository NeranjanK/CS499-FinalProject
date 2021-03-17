import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import MediaCard from '../models/MediaCard';
import { css, jsx } from '@emotion/react';
import {
    Route,
    Switch,
    Link,
    NavLink,
    useParams,
    useRouteMatch
  } from 'react-router-dom';

function TopMovies() {
    const { page } = useParams();
    const { url, path } = useRouteMatch();
    const [topMovies, setTopMovies] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError ] = useState(false);

    useEffect(() => {
        console.log(`url: ${url}`);
        console.log(`path: ${path}`);
        let ignore = false;
        const controller = new AbortController();
        async function fetchTopShows() {
          let responseBody = {};
          setIsLoading(true);
          setIsError(false);
          try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=9668f6ec2bede587fcd2dbf71bbf90c2&language=en-US&page=${page}`
              ,
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
            console.log("== Top Movies:", responseBody);
            setTopMovies(responseBody.results || []);
            setIsLoading(false);
          }
        }
        fetchTopShows();
        return () => {
          controller.abort();
          ignore = true;
        };
      }, [page]);
    return (
        <div>
            <h1>Top Movies</h1>
            <div>
                {
                    topMovies.map(show => (
                        <MediaCard name={show.title} overview={show.overview}/>
                    ))
                }
            </div>
            <p>Page {page}</p>
            <row>
                {(page != '1') ? (
                    <Link to={path.replace(':page', (parseInt(page) - 1).toString())}><button>Prev</button></Link>
                ) : (
                    <Link></Link>
                )}
                <Link to={path.replace(':page', (parseInt(page) + 1).toString())}><button>Next</button></Link>
            </row>
        </div>
    );
}

export default TopMovies;