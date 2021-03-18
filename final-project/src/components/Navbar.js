import React from "react";
import ReactDOM from "react-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {
  Route,
  Switch,
  Link,
  NavLink,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import "../styles/navbar.css";

// function Navbar() {
//   return (
//     <div className="navbar">
//       <ul>
//         <li>
//           <NavLink exact to="/">
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/search">Search</NavLink>
//         </li>
//         <li>
//           <NavLink to="/topmovies/1">Top Movies</NavLink>
//         </li>
//         <li>
//           <NavLink to="/toptv/1">Top TV Shows</NavLink>
//         </li>
//         <li className="tutorial">
//           <NavLink to="/howtouse">How To Use</NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// }

function NewNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/search">Search</Nav.Link>
        <Nav.Link href="/topmovies/1">Top Movies</Nav.Link>
        <Nav.Link href="/toptv/1">Top TV Shows</Nav.Link>
        <Nav.Link href="/howtouse">How To Use</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NewNavbar;
