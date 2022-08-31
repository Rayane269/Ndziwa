

const groupInit = {
    loading: false,
    getGroupIdentifiant: null,
    getGroup: {},
    getGroupsRelatedAtUser: [],
    errors: {}
}

export const GROUP_LOADING = 'GROUP_LOADING'
export const SET_GROUP_MEMBERS = 'SET_GROUP_MEMBERS'
export const GET_GROUP = 'GET_GROUP'
export const GET_GROUPS_RELATED_AT_USER = 'GET_GROUPS_RELATED_AT_USER'
export const GROUP_FAILURE = 'GROUP_FAILURE'


export const groupReducer = (state=groupInit, action) => {

    switch (action.type) {
        case GROUP_LOADING:
            return { ...state, loading: true }
        case SET_GROUP_MEMBERS:
            return { ...state, getGroupIdentifiant: action.payload, loading: false }
        case GET_GROUP:
            return { ...state, getGroup: action.payload, loading: false }
        case GET_GROUPS_RELATED_AT_USER:
            return { ...state, getGroupsRelatedAtUser: action.payload, loading: false }
        case GROUP_FAILURE:
            return { ...state, errors: action.payload }
        default:
            return state;
    }
}