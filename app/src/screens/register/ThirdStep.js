import React, {createContext, useCallback, useContext, useState} from "react"
import { View, KeyboardAvoidingView, ScrollView, Text, ActivityIndicator } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { COLORS, SIZES, FONTS } from "../../../constants"
import { FormContext } from "../../components/Context"
import { ButtonSubmitContext, SmsVerify } from "../../components/Field"
import { useJsonFetch } from "../../functions/hooks"
import { BASE_URL } from "../../config"
import { LastLink } from "../../components/Utils"


const ThirdStep = ({navigation}) => {

    const { data, loading, errors, fetch } = useJsonFetch(`${BASE_URL}/api/register/third-step`)
    const FormCreateContext = createContext({})
    const RenderFormContext = useCallback(({defaultValue, children}) => {
        
        return (
            <FormContext style={{padding: SIZES.padding * 2}} context={FormCreateContext} defaultValue={defaultValue}>
                <View style={{marginBottom: 20}}>
                    <Text style={{...FONTS.h3, color: COLORS.black}}>
                        Entrez le code qui vient de vous être envoyé
                    </Text>
                    {children}
                </View>
            </FormContext>
        )
    })

    log()

    //handler
    const handleSubmit = useCallback( async (value) => {
        const response = await fetch(null, {
            method: "POST",
            body: {"code": value}
        })
        console.log(response, data)
        if (response !== undefined) {
            navigation.navigate("inscription_step_4")
        }
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? 'padding' : null}
            style={{flex: 1}}
       >
            <LinearGradient
                start={{x: 0.15, y: .2}} end={{x: 0.24, y: .0}}
                colors={[COLORS.white, COLORS.green]}
                style={{flex: 1}}
            >
                <ScrollView >
                    <LastLink navigation={navigation} link="inscription_step_2" />
                    <View style={{justifyContent: "center", alignItems: "center", marginVertical: SIZES.padding * 3.5}}>
                        <Text style={{
                            justifyContent: "center",
                            color: COLORS.black, ...FONTS.h1
                        }}>SMS Verification</Text>
                    </View>
                    <RenderFormContext defaultValue={{"code": null}}>
                        <SmsVerify
                            onSubmit={handleSubmit}
                            errors={errors.message}
                        />
                        <ButtonSubmitContext disabled={!loading} onSubmit={handleSubmit} context={FormCreateContext}>
                            { loading ? <ActivityIndicator color={COLORS.white} size="small" /> : `Confirmer`}
                        </ButtonSubmitContext>
                    </RenderFormContext>
                </ScrollView>

            </LinearGradient>
       </KeyboardAvoidingView> 
    )
}


export default ThirdStep