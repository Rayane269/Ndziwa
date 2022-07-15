import React, {} from "react"
import { View, Text, Button } from "react-native"
import { useAuth } from "../functions/auth"


const Home = () => {
    const {logout} = useAuth()

    return (
        <View>
            <Text>Je suis le home page</Text>
            <Button title="deconnexion" onPress={() => logout()} />
        </View>
    )
}

export {Home}