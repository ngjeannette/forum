/*eslint-disable */
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import '../App.scss'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateQID } from '../actions';
// import LoaderWrapper from './LoaderWrapper';
import Questions from './Questions';
import withLoader from './withLoader';
const QuestionsWithLoader = withLoader(Questions);

function UserQ() {
    const loginInfoReducer = useSelector(state => state.loginInfoReducer);
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);

    useEffect(() => {}, [isLoading])
    useEffect(() => { 
        if(loginInfoReducer.length > 0) axiosGetItems()
     }, [loginInfoReducer]);

    const axiosGetItems = async () => {
        const value = {
            userID: loginInfoReducer[0]._id
        }
        try {
            setLoading(true);
            const getUserQValue = await axios.get(
              "/getUserQ",
              { params: value }
            );
            setItems(getUserQValue.data)
            setLoading(false)
        }
        catch(err) {
            console.log(err,'err')
        }
    };

    const sendIndividualQ = (id, userID) => {
        dispatch(updateQID({_id : id, userID}))
        history.push("/userQindividual");
    }

    return (
        <>
            <h1>Your Question</h1>
            <QuestionsWithLoader
                isLoading={isLoading}
                items={items}
                sendIndividualQ={sendIndividualQ}
            />
        </>
    )
}
export default UserQ;