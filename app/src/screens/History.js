import React from "react"
import { View, Text } from "react-native"
import { COLORS, SIZES } from "../../constants"
import MainLayout from "./MainLayout"



const History = () => {
    return (
        <MainLayout
            behavior={Platform.OS === "ios" ? "padding" : null}
            containerStyle={{ flex: 1}}
        >
            <Text>Je suis le history page</Text>
        </MainLayout>
    )
}


export default History