import React from "react"
import { View, Text, Button } from "react-native"
import Spinner from "react-native-loading-spinner-overlay"
import { useAuth } from "../../functions/auth"



const Settings = ({navigation}) => {
    const { loading, logout } = useAuth()

    return (
        <View>
            {loading &&
                <Spinner visible={true} />
            }
            <Text>Je suis le settings page</Text>
            <Button onPress={() => {logout(); navigation.replace('connexion')}} title="Deconnexion" />
        </View>
    )
}

export default Settings