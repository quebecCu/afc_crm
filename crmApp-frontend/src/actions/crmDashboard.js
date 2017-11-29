export const CHANGE_VIEW_DASH = 'CHANGE_VIEW_DASH';
export const CHANGE_LOADING = 'CHANGE_LOADING';

export function changeViewDashboard (newView){
    return {type: CHANGE_VIEW_DASH, newView}
}

export function changeLoading(newLoading) {
	return {type: CHANGE_LOADING, newLoading}
}
