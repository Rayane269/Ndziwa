import React from "react"
import { View, Text } from "react-native"
import { COLORS, SIZES } from "../../constants"
import MainLayout from "../MainLayout"



const AboutTontineInProgress = ({navigation, route}) => {
    console.log(route)
    return (
        <MainLayout
            behavior={Platform.OS === "ios" ? "padding" : null}
            containerStyle={{ flex: 1}}
        >
            <Text>About tontine in progress</Text>
        </MainLayout>
    )
}


export default AboutTontineInProgress