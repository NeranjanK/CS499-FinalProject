/** @jsxImportSource @emotion/react */
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

function TopTV() {
    const { page } = useParams();
    const { url, path } = useRouteMatch();
    const [topShows, setTopShows] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError ] = useState(false);
    const listStyle = css`
    list-style-type: none;
    padding: 10px;
    margin: 10px;
    overflow: auto;
    text-align: center;
    `;

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        async function fetchTopShows() {
          let responseBody = {};
          setIsLoading(true);
          setIsError(false);
          try {
            const res = await fetch(
                `https://api.themoviedb.org/3/tv/popular?api_key=9668f6ec2bede587fcd2dbf71bbf90c2&language=en-US&page=${page}`
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
            console.log("== Top TV shows:", responseBody);
            setTopShows(responseBody.results || []);
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
            <h1>Top TV Shows</h1>
            <ul css={listStyle}>
                {
                    topShows.map(show => (
                        <MediaCard name={show.name} imagePath={show.poster_path} date={show.first_air_date} overview={show.overview}/>
                    ))
                }
            </ul>
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

export default TopTV;