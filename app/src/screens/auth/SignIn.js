import React, { createContext, useCallback, useEffect, useState } from "react"
import { 
    View, 
    Text, 
    TouchableOpacity, 
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { COLORS, SIZES, FONTS } from '../../../constants'
import { TextFieldContext, PasswordFieldContext, ButtonSubmitContext } from "../../components/Field"
import { isAuthenticated, useAuth } from "../../functions/auth"
import { FormContext } from "../../components/Context"
import { RenderLogo } from "../../components/Utils"
import Spinner from "react-native-loading-spinner-overlay"
 

/**
 * Connexion
 * 
 * @param {NavigationContainerEventMap} navigation 
 * @returns 
 */
const SignIn = ({navigation}) => {
    
    const FormCreateContext = createContext({})
    const [value, setValue] = useState({"telephone": null, "password": null})
    const { data, loading, error, login } = useAuth()
    const { authenticated, loadingIsAuthenticate, is } = isAuthenticated()
    
    //functions
    const RenderFormContext = ({defaultValue, children}) => {

        return (
            <FormContext style={{padding: SIZES.padding * 2}} context={FormCreateContext} defaultValue={defaultValue} >
                    <View style={{marginBottom: SIZES.padding * 2}}>
                        <View>
                            <Text style={{textAlign: "center", color: COLORS.black, ...FONTS.body1, marginBottom: 20}}>Connexion</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: SIZES.padding * 1.5,
                                    fontWeight: "bold",
                                    color: COLORS.gray
                                }}
                            >
                                Entrez votre numéro de téléphone et votre mot de passe pour vous connecter
                            </Text>
                        </View>
                    </View>
                    {error && Object.values(error).length === 1 &&
                        <View style={{
                            height: 50,
                            marginBottom: 10
                            
                        }}>
                            <Text style={{
                                textAlign: "center",
                                fontSize: SIZES.padding * 1.7,
                                color: COLORS.red
                            }}>{error.errors}</Text>
                        </View>
                    }
                    
                    {children}
                    <View style={{marginVertical: 20, paddingHorizontal: 10}}>
                        <View style={{justifyContent: "flex-end"}}>
                            <TouchableOpacity>
                                <Text style={{textDecorationLine: "underline", color: COLORS.black}}>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: "row", marginTop: 20}}>
                            <Text style={{color: COLORS.black, fontSize: SIZES.padding * 1.2}}>Vous n'avez pas de compte ? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('inscription_step_1')}>
                                <Text style={{color: COLORS.blue, marginLeft: 10}}>Inscrivez-vous</Text>
                            </TouchableOpacity>
                        </View>
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
    
    //const $response = isAuthenticated();
    useEffect(() => {
        is()
    }, [])
    
    useEffect(() => {
       if (authenticated) {
            navigation.navigate('home')
        }
    }, [authenticated])
       
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            {loadingIsAuthenticate && authenticated === null &&
                <Spinner visible={true} />
            }
            {!authenticated && !loadingIsAuthenticate &&
                <LinearGradient 
                    start={{x: 0.15, y: .2}} end={{x: 0.24, y: .0}}
                    colors={[COLORS.white, COLORS.green]}
                    style={{flex: 1}}
                >
                    <ScrollView >
                        <RenderLogo />
                        <RenderFormContext defaultValue={{"telephone": value.telephone, "password": value.password}}>
                            <TextFieldContext context={FormCreateContext} name="telephone" type="phone-pad" errors={error.errors}>Téléphone</TextFieldContext>
                            <PasswordFieldContext context={FormCreateContext} name="password" errors={error.errors}>Mot de passe</PasswordFieldContext>
                            <ButtonSubmitContext disabled={loading} context={FormCreateContext} onSubmit={handleSubmit}>
                                { loading 
                                    ?
                                        <ActivityIndicator color={COLORS.black} size="small" /> 
                                    : 
                                        `Se connecter`
                                }
                            </ButtonSubmitContext>
                        </RenderFormContext>
                    </ScrollView>
                </LinearGradient>
            }
        </KeyboardAvoidingView>
    )
}

export default SignIn