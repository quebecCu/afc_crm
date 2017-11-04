export const CHANGE_VIEW_UM = 'CHANGE_VIEW_UM';


export function changeViewUserManagement (newView){
    return {type: CHANGE_VIEW_UM, newView}
}