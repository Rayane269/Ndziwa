import { BASE_URL } from "../../config"
import { ApiError, jsonFetch } from "../../functions/api"
import { CURRENT_USER_SUCCESS, CURRENT_USER_LOADING, CURRENT_USER_FAILURE } from "./userReducer"

export const getCurrentUserAction = () => dispatch => {
    const url = `${BASE_URL}/api/me`
    dispatch({ type: CURRENT_USER_LOADING })

    try {
        jsonFetch(url, {method: "GET"})
            .then(data => {
                if (Object.entries(data).length === 0) throw new ApiError({message: "Access denied"}, 403)
                dispatch({
                    type: CURRENT_USER_SUCCESS,
                    payload: { ...data.data }
                })
            })  
    } catch (e) {
        if (e instanceof ApiError) {
            return dispatch({
                type: CURRENT_USER_FAILURE,
                payload: { e }
            })
        }
    }
    
}
