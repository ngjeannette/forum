import loginInfoReducer from './logininfo';
import createQuestionReducer from './createquestion';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    loginInfoReducer,
    createQuestionReducer
});
export default allReducers;