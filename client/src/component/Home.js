/*eslint-disable */
import React , {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import '../App.scss'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateQID } from '../actions';
import LoaderWrapper from './LoaderWrapper';
import Questions from './Questions';
import withLoader from './withLoader';
const QuestionsWithLoader = withLoader(Questions);

function Home() {
    useEffect(()=>{displayItems()},[]);
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {},[items, isLoading])

    const displayItems = async() => {
        try {
            setLoading(true);
            const items = await axios.get(
              "/getDisplayAll"
            );
            setItems(items.data)
            setLoading(false);
        }
        catch(err) {console.log(err,'err')}
    };

    const sendIndividualQ = (_id, userID) => {
        dispatch(updateQID({ _id, userID}))
        history.push("/userQindividual");
    }

    return (
        <>
            <h1>Home</h1>
            <QuestionsWithLoader
                isLoading={isLoading}
                items={items}
                sendIndividualQ={sendIndividualQ}
            />
        </>
    )
}
export default Home;