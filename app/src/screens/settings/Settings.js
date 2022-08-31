import React from "react"
import { View, Text, Button } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import { useAuth } from "../../functions/auth"
import MainLayout from "../MainLayout"



const Settings = ({navigation}) => {
    const { loading, logout } = useAuth()

    return (
        <MainLayout
            behavior={Platform.OS === "ios" ? "padding" : null}
            containerStyle={{ flex: 1}}
        >
            {loading &&
                <Spinner visible={true} />
            }
            <Button onPress={() => {logout(); navigation.replace('connexion')}} title="Deconnexion" />
        </MainLayout>
    )
}

export default Settings