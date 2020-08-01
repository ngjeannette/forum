import React from 'react';
import {  Link } from "react-router-dom";

const DisplayPostForm = ({ displayPost, index, isLoggedIn, submitAnswer, textareaValue, setTextareaValue, setAnswer,setImage,setImageValue, imageValue }) => {
    if (displayPost) {
        return (
            <div className="answers" key={index}>
                <form onSubmit={(e) => { submitAnswer(e) }}>
                    <label className="label">Post Answer</label>
                    <div className="control">
                        <textarea rows={2} name="image" className="textarea" value={textareaValue} onChange={(e) => { setTextareaValue(e.target.value); setAnswer(e.target.value) }} placeholder="Add question"></textarea>
                    </div>
                    <div className="control">
                        <input className="input is-primary" accept="image/*" type="file" name="image" value={imageValue} onChange={(e) => { setImage(e.target.files); setImageValue(e.target.value) }} />
                    </div>
                    <div className="control">
                        <button className="button is-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    } else if (isLoggedIn) {
        return (
            <div className="notification is-info">
                <Link to="/signup">Sign Up </Link>or
                <Link to="/signup"> login </Link>
                    to post an answer
            </div>
        )
    } 
    return null;
}

export default DisplayPostForm;