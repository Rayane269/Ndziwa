import React, { createContext, useCallback, useContext, useMemo, useState } from "react"
import { 
    View, 
    Text, 
    TouchableOpacity, 
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
    ActivityIndicator
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { COLORS, SIZES, FONTS, icons, images } from '../../../constants'
import { TextFieldContext, PasswordFieldContext, ButtonSubmitContext } from "../../components/Field"
import { useAuth } from "../../functions/auth"
import { FormContext } from "../../components/Context"

/**
 * Connexion
 * 
 * @param {NavigationContainerEventMap} navigation 
 * @returns 
 */
const SignIn = ({navigation}) => {
    
    const FormCreateContext = createContext({})
    const [value, setValue] = useState({"telephone": null, "password": null})
    const { user, loading, error, login } = useAuth()
    
    //functions
    const RenderHeader = () => {
        return (
            <TouchableOpacity 
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding * 3,
                    paddingHorizontal: SIZES.padding
                }}
                onPress={() => {navigation.navigate('inscription_step_1')}}
            >
                <Image 
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}
                />
                <Text style={{
                    marginLeft: SIZES.padding * 1.5, 
                    color: COLORS.white, 
                    ...FONTS.h4
                }}>
                    Inscription
                </Text>
            </TouchableOpacity>
        )
    }
    
    const RenderLogo = () => {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3.5,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image 
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{
                        width: "60%",
                    }}
                />
            </View>
        )
    }
    
    const RenderFormContext = ({defaultValue, children}) => {

        return (
            <FormContext context={FormCreateContext} defaultValue={defaultValue} >
                    {error && Object.values(error).length === 1 &&
                        <View style={{
                            alignItems: "center",
                            height: 50,
                            marginVertical: SIZES.padding * 1,
                            
                        }}>
                            <Text style={{
                                fontSize: SIZES.padding * 1.7,
                                color: COLORS.red
                            }}>{error.errors}</Text>
                        </View>
                    }
                    {children}
                    <View style={{flexDirection: "row", marginVertical: 20}}>
                        <Text style={{color: COLORS.black, fontSize: SIZES.padding * 1.2}}>Vous n'avez pas de compte ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('inscription_step_1')}>
                            <Text style={{color: COLORS.blue, marginLeft: 10}}>Inscrivez-vous</Text>
                        </TouchableOpacity>
                    </View>
            </FormContext>
        )
    }

    //handler
    const handleSubmit = useCallback(async (value) => {
        setValue(v => ({...v, password: value.password, telephone: value.telephone}))
        const response = await login(value)
        if (response !== undefined) {
            navigation.navigate('home')
        }
    }, [])

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient 
                colors={[COLORS.violet, COLORS.lightViolet]}
                style={{flex: 1}}
            >
                <ScrollView >
                    <RenderHeader />
                    <RenderLogo />
                    <RenderFormContext defaultValue={{"telephone": value.telephone, "password": value.password}}>
                        <TextFieldContext context={FormCreateContext} name="telephone" type="phone-pad" errors={error.errors}>Téléphone</TextFieldContext>
                        <PasswordFieldContext context={FormCreateContext} name="password" errors={error.errors}>Mot de passe</PasswordFieldContext>
                        <ButtonSubmitContext context={FormCreateContext} onSubmit={handleSubmit}>
                            { loading ? <ActivityIndicator color={COLORS.white} size="small" /> : `Se connecter`}
                        </ButtonSubmitContext>
                    </RenderFormContext>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default SignIn