import ReactDOM from "react-dom";
import { Form, Button} from 'react-bootstrap';
import {
  Route,
  Switch,
  Link,
  NavLink,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useState } from 'react';
import Axios from 'axios';

function Register(){
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [backToLogin, setBackToLogin] = useState(false);

    const createUser = () => {
        console.log(username)
        console.log(password)
        Axios.post('http://localhost:3001/create_user', {
            username: username,
            password: password
        }).then(
            ()=>{
                console.log('success');
            }
        );
        setBackToLogin(true);
    }

    return(
        <div>
        {backToLogin && <Redirect to="/"/>}
        <Form>
            <Form.Group controlId="formBasicUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" onChange={(event) => {
                    setUserName(event.target.value);
                }}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(event) => {
                    setPassword(event.target.value);
                }}/>
            </Form.Group>
            <Button variant="primary" onClick={createUser}>
                Create Account
            </Button>
        </Form>
        </div>
    )
}

export default Register