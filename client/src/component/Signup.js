import React, {useState, useEffect} from 'react';
import '../App.scss';
import axios from 'axios';

function Signup() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(false);
    useEffect(()=>{
    },[username, password]);

    const axioscheckDuplicate = () => {
        const values =  {username, password};
        return axios.get("/checkduplicatesignup", {
          params: values,
        });
    }   
    
    const submitSignup = async (e) => {
        try{
            const isDuplicate = await axioscheckDuplicate();
            setNotification(isDuplicate.data);
        }catch(err){
            console.log(err,'err')
        }
    }
    return (
        <div className="form">
            <h1>Signup</h1>
            <form className="field" onSubmit={(e) => {e.preventDefault(); submitSignup()}}>
                <label className="label">Create Username</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input" required onChange={(e)=>{setUserName(e.target.value)}} />
                </div>
                <label className="label">Create Password</label>
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
export default Signup;