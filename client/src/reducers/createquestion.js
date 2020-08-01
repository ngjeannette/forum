const createQuestionReducer = (state = '', action) => {
    switch (action.type) {
        case "SELECTED_USER_QUESTIONID":
            return action.payload
        case "SELECTED_USER_QUESTIONID_EMPTY":
            return '';
        default:
            return state
    }
}
export default createQuestionReducer;