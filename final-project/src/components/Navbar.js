import React from "react";
import ReactDOM from "react-dom";
import Home from './Home';
import Search from './Search';
import TopMovies from './TopMovies';
import TopTV from './TopTV';
import HowToUse from './HowToUse';
import queryString from 'query-string';
import WatchList from './WatchList';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import {
  Route,
  Switch,
  Link,
  NavLink,
  Redirect,
  useParams,
  useRouteMatch,
  useLocation
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { getCurrUser} from '../redux/selectors';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';

import "../styles/navbar.css";

function useQueryString() {
  return queryString.parse(useLocation().search);
}

function NewNavbar() {
  const dispatch = useDispatch();
  const currUser = useSelector(getCurrUser);
  console.log(useSelector(getCurrUser));
  const { url, path } = useRouteMatch();
  return (
    <div>
      {(Object.keys(currUser).length === 0 || currUser.message || currUser.userID == 0) && <Redirect to="/"></Redirect>}
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <NavLink to={`${url}`}>Home</NavLink>
        <NavLink to={`${url}/search`}>Search</NavLink>
        <NavLink to={`${url}/topmovies/1`}>Top Movies</NavLink>
        <NavLink to={`${url}/toptv/1`}>Top TV Shows</NavLink>
        <NavLink to={`${url}/howtouse`}>How To Use</NavLink>
        <NavLink to={`${url}/mwatchlist`}>Movie Watch Later List</NavLink>
        <Button onClick={()=>{
          const setUserAction = setUser({username: "", userID: 0});
          dispatch(setUserAction);
        }}>Logout</Button>
      </Nav>
    </Navbar>
    <Switch>
      <Route path={`${path}/search`}>
        <Search query={useQueryString().q} />
      </Route>
      <Route path={`${path}/topmovies/:page`}>
        <TopMovies />
      </Route>
      <Route path={`${path}/toptv/:page`}>
        <TopTV />
      </Route>
      <Route path={`${path}/howtouse`}>
        <HowToUse />
      </Route>
      <Route path={`${path}/mwatchlist`}>
        <WatchList/>
      </Route>
      <Route exact path={`${path}/`}>
        <Home />
      </Route>
    </Switch>
  </div>
  );
}

export default NewNavbar;
