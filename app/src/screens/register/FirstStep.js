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
import { COLORS, SIZES, FONTS, theme, icons, images } from '../../../constants'
import { FormContext } from '../../components/Context'
import { ButtonSubmitContext, TextFieldContext } from '../../components/Field'
import { useJsonFetch } from '../../functions/hooks'
import { BASE_URL } from '../../config'
import { RenderLogo } from '../../components/Utils'

const FirstStep = ({navigation}) => {

    const FormCreateContext = createContext({})
    const [value, setValue] = useState({"nom": null, "prenom": null})
    const { data, loading, errors, fetch } = useJsonFetch(`${BASE_URL}/api/register/first-step`)

    
    //functions
    
    const RenderFormContext = ({defaultValue, children}) => {
        
        return (
            <FormContext style={{padding: SIZES.padding * 2}} context={FormCreateContext} defaultValue={defaultValue}>
                <View style={{justifyContent: "center", alignItems: "center", marginBottom: SIZES.padding * 2}}>
                    <Text style={{
                        justifyContent: "center",
                        color: COLORS.black, ...FONTS.h1
                    }}>Inscription</Text>
                </View>
                {children}
            </FormContext>
        )
    }
    
    const handleSubmit = useCallback(async (value) => {
        setValue(v => ({ ...v, nom: value.nom, prenom: value.prenom}))
        const response = await fetch(null, {
            method: "POST",
            body: {...value}
        })

        if (response !== undefined) {
            navigation.navigate('inscription_step_2')
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
                <ScrollView keyboardShouldPersistTaps="handled" >
                    <RenderLogo />
                    <RenderFormContext defaultValue={{"nom": value.nom, "prenom": value.prenom}}>
                        <TextFieldContext 
                            context={FormCreateContext} 
                            errors={errors.errors || ''}
                            name="nom" 
                            type="default" 
                            helper="* Entrer le nom de votre carte d'identité officiel"
                        >
                            Nom
                        </TextFieldContext>
                        <TextFieldContext  
                            context={FormCreateContext} 
                            errors={errors.errors || ''}
                            name="prenom" 
                            type="default" 
                            helper="* Entrer le prénom de votre carte d'identité officiel"
                        >
                            Prénom
                        </TextFieldContext>
                        
                        <View style={{
                            flexDirection: "row", 
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: SIZES.padding * 4,
                            marginBottom: 20,
                            borderColor: COLORS.black
                            
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate('connexion')}>
                                <Text style={{
                                    fontSize: SIZES.padding * 1.4,
                                    textDecorationLine: "underline",
                                    color: COLORS.green
                                }}>J'ai déja un compte ?</Text>
                            </TouchableOpacity>
                            <ButtonSubmitContext 
                                context={FormCreateContext}
                                onSubmit={handleSubmit}
                                disabled={loading}
                            >
                                { loading ? <ActivityIndicator color={COLORS.black} size="small" /> : `Suivant`}
                            </ButtonSubmitContext>
                        </View>
                    </RenderFormContext>

                </ScrollView>

            </LinearGradient>
       </KeyboardAvoidingView> 
    )
}

export default FirstStep