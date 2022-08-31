import { BASE_URL } from "../../config"
import { jsonFetch } from "../../functions/api"
import {
    GROUP_LOADING,
    GET_GROUP,
    SET_GROUP_MEMBERS,
    GET_GROUPS_RELATED_AT_USER,
    GROUP_FAILURE
} from "./groupReducer"

/**
 * recuperer un groupe a partir de son identifiant
 * 
 * @param {CallableFunction} dispatch
 * @param {number} id identifiant du groupe
 * @returns {void}
 */
export const getGroupAction = (dispatch, id) => {
    const url = `${BASE_URL}/api/group/${id}`

    dispatch({type: GROUP_LOADING})
    try {
        jsonFetch(url, {method: "GET"})
            .then(data => {
                dispatch({
                    type: GET_GROUP,
                    payload: { ...data.data }
                })
            })  
    } catch (e) {
        if (e instanceof ApiError) {
            return dispatch({
                type: GROUP_FAILURE,
                payload: { e }
            })
        }
    }
}
 
/**
 * Ajouter les membres du group (premiere etap pour créer un group)
 * 
 * @param {CallableFunction} dispatch
 * @param {Array} members membre a ajouter dans le group
 * @returns {void}
 */
export const setGroupMembersAction = (dispatch, members=[]) => {
    const url = `${BASE_URL}/api/group/firstStep`

    dispatch({type: GROUP_LOADING})
    try {
        jsonFetch(url, {method: "POST", body: members})
            .then(data => {
                dispatch({
                    type: SET_GROUP_MEMBERS,
                    payload: { ...data.data }
                })
            })  
    } catch (e) {
        if (e instanceof ApiError) {
            return dispatch({
                type: GROUP_FAILURE,
                payload: { e }
            })
        }
    }
}

/**
 * recuperer tous les groupes appartenant à un utilisateur
 * 
 * @param {CallableFunction} dispatch
 * @param {number} id identifiant de l'utilisateur
 * @returns {void}
 */
 export const getGroupsRelatedAtUserAction = (dispatch, id) => {
    const url = `${BASE_URL}/api/tontines/?user=${id}`
    
    dispatch({type: GROUP_LOADING})
    try {
        jsonFetch(url, {method: "GET"})
            .then(data => {
                dispatch({
                    type: GET_GROUPS_RELATED_AT_USER,
                    payload: [ ...data.data ]
                })
            })  
    } catch (e) {
        if (e instanceof ApiError) {
            return dispatch({
                type: GROUP_FAILURE,
                payload: { e }
            })
        }
    }
}


