import { useState, useCallback } from "react"
import { ApiError, jsonFetch } from "./api"




/**
 * Hook faisant un appel fetch et flash en cas d'erreur / succès
 *
 * @param {string} url
 * @param {object} params
 * @return {{data: Object|null, fetch: fetch, loading: boolean, errors: Object|null}}
 */
 export function useJsonFetch (url, params = {}) {

    const [state, setState] = useState({
      loading: false,
      data: {},
      errors: {}
    })

    /**
     * fetch
     * 
     * @param {string}
     * @param {{method: string, body: {}, ...params}}
     * 
     * @return {void}
     */
    const fetch = useCallback( async (localUrl, localParams) => {

        setState(s => ({ ...s, loading: true }))

        try {

          const response = await jsonFetch(localUrl || url, localParams || params)
          setState(s => ({ ...s, loading: false, data: response, errors: {}}))
          return response

        } catch (e) {

          if (e instanceof ApiError) {
            setState(s => ({ ...s, loading: false, errors: e.data, data: {}}))
          }
        }

        setState(s => ({ ...s, loading: false }))

    }, [url, params])

    return { ...state, fetch }
  }