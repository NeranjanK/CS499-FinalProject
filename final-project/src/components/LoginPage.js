import React from "react";
import ReactDOM from "react-dom";
import { Form, Button} from 'react-bootstrap';
import Axios from 'axios';
import {
  Link, Redirect,
} from "react-router-dom";
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions';
import { useSelector } from 'react-redux';
import { getCurrUser} from '../redux/selectors';

function LoginPage() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const currUser = useSelector(getCurrUser);

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        }).then(
            (response)=>{
                console.log(response);
                if(response.data.message){
                    console.log(response.data.message);
                }
                else{
                    const setUserAction = setUser({username: response.data[0].Username, userID: response.data[0].UserId});
                    dispatch(setUserAction);
                }
                console.log(currUser);
            }
        );
    }

    return(
        <Form>
            <Form.Group controlId="formBasicUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" onChange={(event) => {
                    setUserName(event.target.value);
                }}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" onChange={(event) => {
                    setPassword(event.target.value);
                }}/>
            </Form.Group>
            <Button variant="primary" onClick={login}>
                Login
            </Button>
            <Link to="/register">
                <Button>
                    Register
                </Button>
            </Link>
            {(currUser.userID > 0) && <Redirect to="/navbar"/>}
        </Form>
    );
}

export default LoginPage;
