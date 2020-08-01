import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../App.scss'

function CreateQ() {
    const history = useHistory();

    const [question, setQuestion] = useState('');
    const [image, setImage] = useState([]);
    const loginInfoReducer = useSelector(state => state.loginInfoReducer);

    useEffect(() => {},[question, image, loginInfoReducer])

    const submitQuestion = (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('image', image[0]);
        bodyFormData.set('userID', loginInfoReducer[0]._id);
        bodyFormData.set('username', loginInfoReducer[0].username);
        bodyFormData.set('question', question);
        axios({
            method: 'post',
            url: '/createQ',
            data: bodyFormData,
        })
            .then(function (response) {
                history.push("/userQ");
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    return (
        <>
            <h1>New Story</h1>
            <form onSubmit={(e) => { submitQuestion(e) }}>
                <label className="label">New Question</label>
                <div className="control">
                    <textarea rows={2} name="testing" className="textarea" onChange={(e) => { setQuestion(e.target.value) }} placeholder="Add question" required></textarea>
                </div>
                <div className="control">
                    <input accept="image/*" type="file" name="image" className="input is-primary" onChange={(e) => { setImage(e.target.files) }} />
                </div>
                <div className="control">
                    <button className="button is-primary" type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}
export default CreateQ;