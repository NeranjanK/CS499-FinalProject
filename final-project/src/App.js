import './App.css';
import NewNavbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Register from './components/Register';

import queryString from 'query-string';

import {
  Route,
  Switch,
  useLocation
} from 'react-router-dom';

function useQueryString() {
  return queryString.parse(useLocation().search);
}

function App() {
  return (
    <div>
      <Switch>
          <Route exact path="/">
            <LoginPage/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/navbar">
            <NewNavbar/>
          </Route>
      </Switch>
    </div>

  );
}

export default App;