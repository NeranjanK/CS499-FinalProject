import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Switch,
    Link,
    NavLink,
    Redirect,
    useParams,
    useRouteMatch, 
    useLocation
  } from 'react-router-dom';

  import '../styles/home.css'

function Home() {
    return (
        <div className = "home_box">
            <div>
                <div className = "title_holder">
                    <h1 className = "title">Director's Cut</h1>

                    <p className = "description">Your number one movie/tv show destination!</p>
                </div>
            </div>

            <div className = "usage">
                <Link to="/howtouse">How To Use</Link>
            </div>
        </div>

    );
}

export default Home;