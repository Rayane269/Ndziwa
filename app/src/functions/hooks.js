import { useState } from "react"
import { ApiError, jsonFetch } from "./api"




/**
 * Hook faisant un appel fetch et flash en cas d'erreur / succès
 *
 * @param {string} url
 * @param {object} params
 * @return {{data: Object|null, fetch: fetch, loading: boolean, done: boolean}}
 */
 export function useJsonFetch (url, params = {}) {

    const [state, setState] = useState({
      loading: false,
      data: null,
      errors: null
    })

    const fetch = useCallback( async (localUrl, localParams) => {

        setState(s => ({ ...s, loading: true }))

        try {

          const response = await jsonFetch(localUrl || url, localParams || params)
          setState(s => ({ ...s, data: response}))
          return response

        } catch (e) {

          if (e instanceof ApiError) {
            setState(s => ({ ...s, errors: e}))
          }
        }

        setState(s => ({ ...s, loading: false }))

    }, [url, params])

    return { ...state, fetch }
  }