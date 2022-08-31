
const contactsInit = {
    loading: false,
    registredContacts: [],
    unregistredContacts: [],
    filterContacts: [],
    errors: {}
}

export const GET_CONTACTS_LOADING = 'GET_CONTACT_LOADING'
export const ALL_REGISTRED_CONTACTS = 'ALL_REGISTRED_CONTACTS'
export const ALL_UNREGISTRED_CONTACTS = 'ALL_UNREGISTRED_CONTACTS'
export const GET_CONTACTS_FAILURE = 'GET_CONTACT_FAILURE'


export const contactReducer = (state=contactsInit, action) => {

    switch (action.type) {
        case GET_CONTACTS_LOADING:
            return { ...state, loading: true }
        case ALL_REGISTRED_CONTACTS:
            return { ...state, registredContacts: action.payload, loading: false }
        case ALL_UNREGISTRED_CONTACTS:
            return { ...state, unregistredContacts: action.payload, loading: false }
        default:
            return state;
    }
}