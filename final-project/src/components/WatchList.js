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
import { useSelector } from 'react-redux';
import { getCurrUser } from '../redux/selectors';
import Axios from 'axios';

function WatchList() {
    const currUser = useSelector(getCurrUser);
    const [watchLaterIdList, setWatchLaterIdList] = useState([])
    const [detailList, setDetailList] = useState([])
    var i = 0;
    useEffect(async () => {
        const result = await Axios.get('http://localhost:3001/movie_watch_later_list/' + currUser.userID.toString())
        setWatchLaterIdList(result.data)
        let i = 0;
        let tempList = []
        for (i = 0; i < result.data.length; i++){
            const response = await fetch(`https://api.themoviedb.org/3/movie/${result.data[i].movieID}?api_key=9668f6ec2bede587fcd2dbf71bbf90c2&language=en-US`);
            const json = await response.json();
            tempList = [...tempList, json]
        }
        setDetailList(tempList)
    }, []);

    useEffect(() => {
        
        console.log(detailList)
    }, [detailList])

    console.log(watchLaterIdList)
    console.log(detailList)
    const listStyle = css`
    list-style-type: none;
    padding: 10px;
    margin: 10px;
    overflow: auto;
    text-align: center;
    `;

    return (
        <div>
            <h1>Watch Later List</h1>
            <ul css={listStyle}>
                {
                    detailList.map(show => (
                        <MediaCard name={show.title} imagePath={show.poster_path} date={show.release_date} overview={show.overview} id={show.id} iswatchlist={true}/>
                    ))
                }
            </ul>
        </div>
    );
}

export default WatchList;