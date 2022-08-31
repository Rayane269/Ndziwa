import React from "react"
import { View, Text } from "react-native"
import { COLORS } from "../../../constants"
import { getListContact } from "../../functions"

const UserListForSendOrRequestMoney = () => {

    const { contacts, error } = getListContact()
    console.log(contacts, error)
    return (
        <View>
            {contacts.map(contact => (<Text style={{color: COLORS.white}} key={contact.rawContactId}>{contact.displayName}</Text>))}
        </View>
    )
}

export default UserListForSendOrRequestMoney