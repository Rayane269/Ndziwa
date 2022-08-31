const initialReducer = {
    user: {},
    loading: false,
    errors: {}
}

export const CURRENT_USER_LOADING = 'CURENT_USER_LOADING'
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS'
export const CURRENT_USER_FAILURE = 'CURRENT_USER_FAILURE'

export const userReducer = (state=initialReducer, action) => {
    
    switch (action.type) {
        case CURRENT_USER_LOADING: 
            return { ...state, loading: true }
        case CURRENT_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false }
        case CURRENT_USER_FAILURE: 
            return { ...state, errors: action.payload, loading: false }
        default:
            return state;
    }
}
