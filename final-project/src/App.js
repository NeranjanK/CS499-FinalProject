import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import TopMovies from './components/TopMovies';
import TopTV from './components/TopTV';
import Reviews from './components/Reviews';
import Navbar from './components/Navbar';

import {
  Route,
  Switch,
  Link,
  NavLink,
  Redirect,
  useParams,
  useRouteMatch
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />

      <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/topmovies">
            <TopMovies />
          </Route>
          <Route path="/toptv">
            <TopTV />
          </Route>
          <Route path="/reviews">
            <Reviews />
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
