import { useCallback, useEffect, useState } from "react"
import { BASE_URL } from "../config"
import { ApiError, jsonFetch } from "./api"
import { useJsonFetch } from "./hooks"

/**
 * Connecter ou deconnecter un utilisateurs
 * 
 * @return {{data: Object|null, loading: boolean, error: Objec|null, login: login, logout: logout, getUser: getUser}}
 */
export const useAuth = () => {
	const [state, setState] = useState({
		data: {},
		loading: false,
		error: {}
	})

    /**
     * authentifier un utilisateur
     * @param {Object}
     * @return {void}
     */
    const login = useCallback( async (data) => {
        setState(s => ({ ...s, loading: true }))
        try {
            const csrf = await jsonFetch(`${BASE_URL}/sanctum/csrf-cookie`)
            const response = await jsonFetch(`${BASE_URL}/api/login`, {
                method: 'POST',
                body: data
            })
			setState(s => ({ ...s, data: response, loading: false, error: {} }))
			return response

        } catch (e) {

            if (e instanceof ApiError) {
				setState(s => ({ ...s, data: {}, error: e.data, loading: false}))
            }
        }

        //setState(s => ({ ...s, loading: false }))

    }, [])

    /**
     * Recupére l'utilisateur courant
     */
    const getUser = useCallback( async () => {
        const url = `${BASE_URL}/api/me`
        setState(s => ({ ...s, loading: true}))

        try {
            const data = jsonFetch(url, {method: "GET"})
            setState(s => ({ ...s, data: data, loading: false, error: {} }))
            return data;
            
        } catch (error) {
            if (error instanceof ApiError) {
                setState(s => ({ ...s, error: error, loading: false, data: {} }))
            }
        }

    }, [])

    /**
     * Deconnecte l'utilisateur courant
     */
    const logout = useCallback( async () => {
        
        setState(s => ({ ...s, loading: true }))
        try {
            const response = await jsonFetch(`${BASE_URL}/api/logout`, {
                method: "POST"
            })

            return response

        } catch(e) {
            if (e instanceof ApiError) {
                setState(s => ({ ...s, error: e.data, loading: false }))
            }
        }

        //setState(s => ({ ...s, loading: false }))

    }, [])

    return { ...state, login, logout, getUser }
}


/**
 * activer un compte en saisissant le nin
 * @returns {{loading: boolean, errors: Object|null, activate: activate}}
 */
export const activateMyAccount = () => {

    const [state, setState] = useState({
        loading: false,
        errors: {}
    })

    /**
     * @param {{key: string, value: string}} nin
     */
    const activate = useCallback( async(nin) => {
        setState(s => ({...s, loading: true}))
        try {
            const data = await jsonFetch(`${BASE_URL}/api/bank/activate`, {
                method: "POST",
                body: nin
            })
            return data
        } catch (error) {
            if (error instanceof ApiError) {
                setState(s => ({...s, errors: error.data, loading: false}))
            }
        }

    }, [])

    return {...state, activate}
}

/**
 * Vérifie si l'utilisateur est connecté
 *
 * @return {{data: Object|null, authenticated: boolean, loadingIsAuthenticate: boolean, is: is}}
 */
export function isAuthenticated () {
	const [state, setState] = useState({
        data: {},
        authenticated: null,
        loadingIsAuthenticate: false
    })
    const url = `${BASE_URL}/api/me`
    
    /**
     * @return {void}
     */
    const is = useCallback(async () => {
        setState(s => ({ ...s, loadingIsAuthenticate: true }))
        try {
            const data = await jsonFetch(url, {method: "GET"})
            
            setState(s => ({ ...s, authenticated: true, loadingIsAuthenticate: false, data: data }))
        } catch(e) {
            if (e instanceof ApiError) {
                setState(s => ({ ...s, authenticated: false, loadingIsAuthenticate: false, data: {} }))
            }
        }

        //setState(s => ({ ...s, loadingIsAuthenticate: false }))

    }, [])

    return { ...state, is }
}


/**
 * Vérifie si l'utilisateur est connecté
 *
 * @return {boolean}
 */
export function lastNotificationRead () {
	
}

/**
 * Renvoie l'utilisateur
 *
 * @return {{data: Object|null, loading: boolean, errors: Object|null}}
 */
export function getUser () {
	const url = `${BASE_URL}/api/me`;
    const {data, loading, errors, fetch} = useJsonFetch(url)

    fetch()

    return {data, loading, errors}

}

/**
 * Vérifie si l'utilisateur connecté correspond à l'id passé en paramètre
 *
 * @param {number} userId
 * @return {boolean}
 */
export function canManage (userId) {

	if (isAdmin()) {
		return true
	}

	if (!userId) {
		return false
	}

	
}
  