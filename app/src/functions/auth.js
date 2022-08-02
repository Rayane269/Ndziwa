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
    const getUser = useCallback( async (id) => {
        const url = `${BASE_URL}/api/user/${id}`
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
        authenticated: false,
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
            return true
        } catch(e) {
            if (e instanceof ApiError) {
                setState(s => ({ ...s, authenticated: false, loadingIsAuthenticate: false, data: {} }))
                return false
            }
        }
    }, [])

    return { ...state, is }
}

/**
 * verifie si le mot de passe saisit est celui de l'utilisateur courant
 * 
 * @returns {{error: null|Object, loading: boolean, confirm: CallableFunction}}
 */
export function passwordConfirmation () {

    const { data, loading, errors, fetch } = useJsonFetch()

    /**
     * @param {{name: string, value: any}} data
     */
    const confirm = async (data) => {

        const response = await fetch(
            `${BASE_URL}/api/password-confirmation`, 
            {
                method: "POST",
                body: data
            }
        )

        return response
    }

    return { data, loading, error: errors, confirm }

}

/**
 * Recupere les operations entre l'utilisateur courant et un autre
 * 
 * @param {number} id 
 * @returns {{data: null|Object, loading: boolean, errors: null|Object, getOperations: CallableFunction}}
 */
export function getOperationWithAnotherPerson (id) {

    const { data, loading, errors, fetch } = useJsonFetch()

    const getOperations = () => {
        fetch(`${BASE_URL}/api/operations/${id}`, {method: "GET"})
    }

    return { data, loading, errors, getOperations }
}

/**
 * 
 * @returns {{sending: boolean, errorsTransfer: null|Object, send: send}}
 */
export function setTransfertMoney () {

    const { loading, errors, fetch } = useJsonFetch()

    /**
     * 
     * @param {{telephone: string, somme: float, libelle: string}} data 
     */
    const send = (data) => {
        return fetch(
            `${BASE_URL}/api/transaction/send`, 
            {method: "POST", body: data}
        )
    }

    return { sending: loading, errorsTransfer: errors, send }
}

/**
 * Verifie si le code saisit match avec celui envoyé par sms
 * 
 * @returns {{verifying: boolean, errorSms: Object|null, verify: verify}}
 */
export const setSmsVerify = () => {

    const { loading, errors, fetch } = useJsonFetch()

    /**
     * 
     * @param {{name: string, value: number}} code 
     */
    const verify = (code) => {
    
        return fetch(
            `${BASE_URL}/api/sms-verify`, 
            {method: "POST", body: code}
        )
    }

    return { verifying: loading, errorSms: errors, verify }
}
