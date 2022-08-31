import Contacts from "react-native-contacts"
import { PermissionsAndroid } from "react-native"
import { 
    GET_CONTACTS_LOADING,
    ALL_REGISTRED_CONTACTS, 
    ALL_UNREGISTRED_CONTACTS, 
    GET_CONTACTS_FAILURE
} from "./contactReducer"
import { BASE_URL } from "../../config"
import { jsonFetch } from "../../functions/api"


const getPermissionAndroid = async () => {

    const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS, 
        {
            title: "Contacts",
            message: "Cette application souhaite accéder à vos contact"
        }
    )

    return permission
}

const getAllUser = async () => {
    const url = `${BASE_URL}/api/users`
    return await jsonFetch(url, {method: "GET"})
}

/**
 * matche tous les numeros de télephone d'un contact avec le numero de téléphone de l'utilisateur
 * 
 * @param {Object} user 
 * @param {Array} phoneNumbers
 * @param {CallableFunction} getNumber 
 * @returns {Array}
 */
const check = (user, phoneNumbers=[]) => {
    const telephoneWithCode = user.region.code_appel + user.telephone

    return phoneNumbers.filter(tel => {
        const newTel = tel.number.replace(/\s+/g, "")
        return newTel === telephoneWithCode || newTel === user.telephone
    })
}

/**
 * Verifier si le contact est un utilisateur déja enregistré
 * 
 * @param {Object} user 
 * @param {Array} contacts 
 * @return { Object }
 */
const checkIfContactSaved = (user, contacts=[]) => {
    const response = contacts.filter(contact => (
        check(user, contact.phoneNumbers).length > 0 ? true : false
    ))

    if (response.length > 0) {
        var { displayName: nameOfContact } = response.find(() => true)
    }

    return response.length > 0 ? {id: user.id, roles: JSON.parse(user.roles), nameOfContact, fullName: `${user.nom} ${user.prenom}`, telephone: user.telephone} : false
}
 
const loadContacts = async (dispatch) => {
    const contactsList = await Contacts.getAll()
    const {data: users} = await getAllUser()
    
    const contacts = users.filter(user => (
        !checkIfContactSaved(user, contactsList) ? false : true
    ))
    .map(user => (
        checkIfContactSaved(user, contactsList))
    )
    
    console.log(contacts)
    dispatch({
        type: ALL_REGISTRED_CONTACTS,
        payload: contacts
    })
}


const getRegistredContacts = (dispatch) => {
    if (Platform.OS === "android") {
        getPermissionAndroid()
            .then(() => {
                loadContacts(dispatch)
            })
    } else {
        loadContacts(dispatch)
    }
}

export const getRegistredContactsAction = () => dispatch => {

    dispatch({ type: GET_CONTACTS_LOADING })
    getRegistredContacts(dispatch)

    
}
