import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import TopMovies from './components/TopMovies';
import TopTV from './components/TopTV';
import HowToUse from './components/HowToUse';
import Navbar from './components/Navbar';

import queryString from 'query-string';

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

function useQueryString() {
  return queryString.parse(useLocation().search);
}

function App() {
  return (
    <div>
      <Navbar />

      <Switch>
          <Route path="/search">
            <Search query={useQueryString().q} />
          </Route>
          <Route path="/topmovies">
            <TopMovies />
          </Route>
          <Route path="/toptv">
            <TopTV />
          </Route>
          <Route path="/howtouse">
            <HowToUse />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/">
            <h1>404</h1>
          </Route>
      </Switch>
      <Link to="/">Navigate to home page</Link>
    </div>

  );
}

export default App;
