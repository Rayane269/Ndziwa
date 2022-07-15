import { useCallback, useEffect, useState } from "react"
import { BASE_URL } from "../config"
import { ApiError, jsonFetch } from "./api"
import { useJsonFetch } from "./hooks"

/**
 * Connecter un utilisateurs
 * 
 * @return {Object}
 */
export const useAuth = () => {
	const [state, setState] = useState({
		user: {},
		loading: false,
		error: {}
	})

    const login = useCallback( async (data) => {
        setState(s => ({ ...s, loading: true }))
        try {
            const csrf = await jsonFetch(`${BASE_URL}/sanctum/csrf-cookie`)
            const response = await jsonFetch(`${BASE_URL}/api/login`, {
                method: 'POST',
                body: data
            })
			setState(s => ({ ...s, user: response, error: {} }))
			return response

        } catch (e) {

            if (e instanceof ApiError) {
				setState(s => ({ ...s, user: {}, error: e.data}))
            }
        }

        setState(s => ({ ...s, loading: false }))

    }, [])

    return { ...state, login }
}


/**
 * Vérifie si l'utilisateur est connecté
 *
 * @return {Object}
 */
export function isAuthenticated () {
	const [state, setState] = useState({
       authenticated: false,
       loadingIsAuthenticate: false 
    })
    const url = `${BASE_URL}/api/me`
    const params = {method: "GET"}
    
    /**
     * @return {boolean}
     */
    const is = useCallback(async () => {
        setState(s => ({ ...s, loadingIsAuthenticate: true }))
        try {
            const response = await jsonFetch(url, params)
            setState(s => ({ ...s, loadingIsAuthenticate: false, authenticated: true }))
        } catch(e) {
            if (e instanceof ApiError) {
                setState(s => ({ ...s, loadingIsAuthenticate: false, authenticated: false }))
            }
        }

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
 * @return {Object}
 */
export function getUser () {
	
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
  