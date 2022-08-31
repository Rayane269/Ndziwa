import React, {useEffect, useState} from "react"
import { 
    PermissionsAndroid, 
    Platform 
} from "react-native"

import Contacts from "react-native-contacts"

/**
 * 
 * @returns {{contacts: Contacts, error: Object}}
 */
export const getListContact = () => {

    const [contacts, setContacts] = useState([])
    const [error, setError] = useState({})

    useEffect(() => {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS, 
                {
                    title: "Contacts",
                    message: "Cette application souhaite accéder à vos contact"
                }
            ).then(() => {
                loadContacts()
            })
        } else 
            loadContacts()
    }, [])
    
    const loadContacts = () => {
        Contacts.getAll()
            .then(contacts => {
                contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase())
                setContacts(contacts)
            })
            .catch(e => setError({
                message: "Permission to access contacts was denied",
                value: e
            }))
    }

    return { contacts, error }
}