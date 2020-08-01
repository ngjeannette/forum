import React from 'react';
import '../App.scss';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { emptyinfo } from '../actions';


function Nav() {
    const history = useHistory();
    const dispatch = useDispatch();

    const loginInfoReducer = useSelector(state => state.loginInfoReducer);
    const logOut = () => {
        dispatch(emptyinfo())
        history.push("/");
    }

    return (
        <>
            <nav >
                <div className="navbar-start">
                    <a className="navbar-item" target="_blank" rel="noopener noreferrer" href="https://flaviocopes.com/sample-app-ideas/">Project 12</a>
                    <Link to="/" className="navbar-item">Home</Link>
                    {
                        loginInfoReducer.length > 0 &&
                        <>
                            <Link to="/createQ" className="navbar-item">New Question</Link>
                            <Link to="/userQ" className="navbar-item">Your Questions</Link>
                        </>
                    }
                    <Link to="/signup" className="navbar-item">Sign Up</Link>
                    <Link to="/login" className="navbar-item">Login</Link>
                    {loginInfoReducer.length > 0 && <> <Link to="/" className="navbar-item" onClick={() => { logOut() }}>Log Out</Link></>}
                    {loginInfoReducer.length > 0 && <> <div className="navbar-item">{loginInfoReducer[0].username}</div></>}
                    
                </div>
            </nav>
        </>
    )
}
export default Nav;