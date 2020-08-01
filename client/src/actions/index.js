
export const updateinfo = (info) => {
    return {
        type: 'UPDATE_USER',
        payload: info
    }
}
export const emptyinfo = (info) => {
    return {
        type: 'UPDATE_EMPTY',
        payload: info
    }
}
export const updateQID = (info) => {
    return {
        type: 'SELECTED_USER_QUESTIONID',
        payload: info
    }
}
export const updateQIDEmpty = (info) => {
    return {
        type: 'SELECTED_USER_QUESTIONID_EMPTY',
        payload: info
    }
}