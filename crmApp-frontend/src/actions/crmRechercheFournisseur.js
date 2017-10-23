
export const SEARCH_REQUEST_FOUR = 'SEARCH_REQUEST_FOUR';
export const CHANGE_FORM_FOUR = 'CHANGE_FORM_FOUR';
export const SENDING_REQUEST = 'SENDING_REQUEST';


export function changeFormFour (newFormState){
    return {type: CHANGE_FORM_FOUR, newFormState}
}

export function searchRequestFour (data){
    return {type: SEARCH_REQUEST_FOUR, data}
}

export function sendingRequest (sending){
    return {type: SENDING_REQUEST, sending}
}