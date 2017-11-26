export const CHANGE_VIEW_CONTRACT = 'CHANGE_VIEW_CONTRACT';


export function changeViewContract (newView){
	return {type: CHANGE_VIEW_CONTRACT, newView}
}
