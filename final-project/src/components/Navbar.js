import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    Switch,
    Link,
    NavLink,
    Redirect,
    useParams,
    useRouteMatch
  } from 'react-router-dom';

  import '../styles/navbar.css';

function Navbar() {
    return (
        <div className = "navbar">
            <ul>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/search">Search</NavLink></li>
                <li><NavLink to="/topmovies/1">Top Movies</NavLink></li>
                <li><NavLink to="/toptv/1">Top TV Shows</NavLink></li>
                <li><NavLink to="/reviews">Reviews</NavLink></li>
                <li className = "tutorial"><NavLink to="/howtouse">How To Use</NavLink></li>
            </ul>
      </div>
    );
}

export default Navbar;
