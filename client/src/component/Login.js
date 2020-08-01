import React, {useState} from 'react';
import '../App.scss'
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateinfo } from '../actions';
import axios from 'axios';

function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(false);

    const axiosLogin = () => {
        const values = { username, password };
        return axios.get("/login", { params: values });
    }

    const submitSignup = async (e) => {
        try {
            const isLogin = await axiosLogin();
            if (Array.isArray(isLogin.data) > 0){
                dispatch(updateinfo(isLogin.data))
                history.push("/");
                
            }else {
                setNotification(isLogin.data);
            }
        } catch (err) {
            console.log(err, 'err')
        }
    }

    return (
        <div className="form">
            <h1>Login</h1>
            <form className="field" onSubmit={(e) => { e.preventDefault(); submitSignup() }}>
                <label className="label">Enter Username</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input" required onChange={(e) => { setUserName(e.target.value) }} />
                </div>
                <label className="label">Enter Password</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input" required onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="control">
                    <button className="button is-primary">Submit</button>
                </div>
            </form>
            {
                notification &&
                <div className="notification is-primary">
                    <strong>{notification}</strong>
                </div>
            }
        </div>
    )
}
export default Login;