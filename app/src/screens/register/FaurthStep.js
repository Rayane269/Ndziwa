import React, { createContext, useCallback, useState } from 'react'
import { 
    KeyboardAvoidingView,
    Platform,
    Text, 
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SIZES, FONTS, images, icons } from '../../../constants'
import { FormContext } from '../../components/Context'
import { ButtonSubmitContext, PasswordFieldContext, TextFieldContext } from '../../components/Field'
import { useJsonFetch } from '../../functions/hooks'
import { BASE_URL } from '../../config'
import { LastLink } from '../../components/Utils'


const FourthStep = ({navigation}) => {

    const FormCreateContext = createContext({})
    const [value, setValue] = useState({"password": null, "password_confirm": null})
    const { data, loading, errors, fetch } = useJsonFetch(`${BASE_URL}/api/register/fourth-step`)

    
    //functions
    
    const RenderFormContext = ({defaultValue, children}) => {
        
        return (
            <FormContext context={FormCreateContext} defaultValue={defaultValue}>
                <View style={{justifyContent: "center", alignItems: "center", marginBottom: SIZES.padding * 2}}>
                    <Text style={{
                        justifyContent: "center",
                        color: COLORS.black, ...FONTS.h1
                    }}>Mot de passe</Text>
                    <Text style={{marginTop: SIZES.padding * 3, fontSize: SIZES.padding * 1.5}}>
                        Pour plus de sécurité, définissez un mot de passe sûr, complexe et long à votre compte.
                    </Text>
                </View>
                <View style={{marginTop: SIZES.padding * 4}}>
                    {children}
                </View>
            </FormContext>
        )
    }
    console.log(data, errors, loading)
    const handleSubmit = useCallback(async (value) => {
        setValue(v => ({ ...v, password: value.password, password_confirm: value.password_confirm}))
        const response = await fetch(null, {
            method: "POST",
            body: {...value}
        })

        if (response !== undefined) {
            navigation.navigate('home')
        }
        
    }, [])

    return(
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
                    <LastLink navigation={navigation} link="inscription_step_3" />
                    <RenderFormContext defaultValue={{"password": value.password, "confirm_password": null}}>
                        <PasswordFieldContext 
                            context={FormCreateContext} 
                            errors={errors.errors || ''}
                            name="password" 
                            type="default" 
                            helper="* Votre mot de passe doit faire plus de 8 caractéres, avec un majuscule et un chiffre"
                        >
                            Mot de passe
                        </PasswordFieldContext>
                        <PasswordFieldContext  
                            context={FormCreateContext} 
                            errors={errors.errors || ''}
                            name="confirm_password" 
                            type="default" 
                        >
                            Confirmer le mot de passe
                        </PasswordFieldContext>
                        
                        <View style={{
                            flexDirection: "row", 
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: SIZES.padding * 4,
                            marginBottom: 20,
                            borderColor: COLORS.black
                            
                        }}>
                            <ButtonSubmitContext 
                                context={FormCreateContext}
                                onSubmit={handleSubmit}
                            >
                                { loading ? <ActivityIndicator color={COLORS.white} size="small" /> : `S'inscrire`}
                            </ButtonSubmitContext>
                        </View>
                    </RenderFormContext>

                </ScrollView>

            </LinearGradient>
       </KeyboardAvoidingView> 
    )
}

export default FourthStep