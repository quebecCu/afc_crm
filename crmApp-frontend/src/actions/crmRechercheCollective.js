
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const CHANGE_FORM = 'CHANGE_FORM';
export const SENDING_REQUEST = 'SENDING_REQUEST';


export function changeForm (newFormState){
    return {type: CHANGE_FORM, newFormState}
}

export function searchRequest (data){
    return {type: SEARCH_REQUEST, data}
}

export function sendingRequest (sending){
    return {type: SENDING_REQUEST, sending}
}