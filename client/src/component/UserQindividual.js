import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../App.scss'
import axios from 'axios';
// import Loader from './Loader';
import LoaderWrapper from './LoaderWrapper';
// import Questions from './Questions';
import UserQ from './UserQindividualQ';
import PostAnswer from './PostAnswer';
import DisplayPostForm from './DisplayPostForm';

function UserQIndividual() {
    const history = useHistory();
    const [answer, setAnswer] = useState('');
    const [image, setImage] = useState([]);
    const [postAnswer, setPostAnswer] = useState([]);
    const [textareaValue, setTextareaValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [imageValue, setImageValue ] = useState('');

    const [displayIndividualQ, setDisplayIndividualQ] = useState(null);
    const createQuestionReducer = useSelector(state => state.createQuestionReducer);
    const loginInfoReducer = useSelector(state => state.loginInfoReducer);
    useEffect(() => {createQuestionReducer && axiosGetIndividualQ();},[])
    // useEffect(() => { createQuestionReducer && axiosGetIndividualQ(); }, [createQuestionReducer, loginInfoReducer]);
    useEffect(() => { }, [postAnswer, displayIndividualQ]);

    const axiosGetIndividualQ = async() => {
        try{
            debugger
            setLoading(true)
            const value = {_id: createQuestionReducer._id};
            const answerParams = { questionID: createQuestionReducer._id};
            const individualQValue = await axios.get(
              "/getindividualQ",
              { params: value }
            );
            const answerValue = await axios.get(
              "/getAnswer",
              { params: answerParams }
            );
            setDisplayIndividualQ(individualQValue.data);
            setPostAnswer([...answerValue.data]);
            setLoading(false)
        }
        catch(err) { console.log(err,'err')}
    };

    const axiosGetAnswers = async() => {
        try{
            const answerParams = { questionID: createQuestionReducer._id};
            const answerValue = await axios.get(
              "/getAnswer",
              { params: answerParams }
            );
            setPostAnswer([...answerValue.data])
        }
        catch(err) { console.log(err,'err')}
    };

    const deleteItem = async() => {
        const value = { _id: createQuestionReducer._id };
        try {
            await axios.post("/removeIndividualQ", value);
            history.push("/userQ");
        }
        catch(err) {console.log(err,'err')}

    }; 

    const submitAnswer = (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append('image', image[0]);
        bodyFormData.set('questionID', createQuestionReducer._id);
        bodyFormData.set('questionUserID', createQuestionReducer.userID);
        bodyFormData.set('answerUsername', loginInfoReducer[0].username);
        bodyFormData.set('answerUserID', loginInfoReducer[0]._id);
        bodyFormData.set('answer', answer);
        bodyFormData.set('liked', false);
       
        axios({
          method: "post",
          url: "/createAnswer",
          data: bodyFormData,
        })
          .then(function (response) {
            setPostAnswer([...postAnswer, response.data]);
            setAnswer("");
            setImage([]);
            setTextareaValue("");
            setImageValue("");
          })
          .catch(function (response) {
            console.log(response);
          });
    };

    const updateAnswerLiked = async({ _id, liked}) => {
        const value = { _id, liked: !liked };
        try {
            await axios.post("/updateLiked", value);
            axiosGetAnswers();
        }
        catch (err) { console.log(err, 'err') }
    };

    return (
        <>
            <LoaderWrapper isLoading={isLoading}>
                <div className="question-answer-card">
                    <h1>{displayIndividualQ !== null && displayIndividualQ.length > 0 && displayIndividualQ[0].question}</h1>
                        {
                            displayIndividualQ !== null &&
                            displayIndividualQ.map((item,index) => (
                                <div key={index} className="userQindividual">
                                    <UserQ item={item} index={index} deleteItem={deleteItem} displayDelete={loginInfoReducer.length > 0 && item.userID === loginInfoReducer[0]._id ? true: false} />
                                    <DisplayPostForm 
                                        displayPost={
                                            loginInfoReducer.length > 0 && item.userID !== loginInfoReducer[0]._id ? true : false
                                        }
                                        submitAnswer={submitAnswer}
                                        textareaValue={textareaValue}
                                        setTextareaValue={setTextareaValue}
                                        setAnswer={setAnswer}
                                        setImage={setImage}
                                        setImageValue={setImageValue}
                                        imageValue={imageValue}
                                        isLoggedIn={loginInfoReducer.length === 0 ? true : false}
                                        index={index}
                                    />
                                </div>
                            ))
                        }
                        {
                            postAnswer.length > 0 && 
                            postAnswer.map((answer, index) => (
                                <div className="answers" key={index} >
                                    <PostAnswer
                                        answer={answer}
                                        index={index}
                                        onClick={
                                            loginInfoReducer.length > 0 && answer.questionUserID === loginInfoReducer[0]._id ?
                                                () => { updateAnswerLiked(answer) } :
                                                null
                                        }
                                    /> 
                                </div>
                            ))
                        }
                    </div>
            </LoaderWrapper>
        </>
    )
}

export default UserQIndividual;