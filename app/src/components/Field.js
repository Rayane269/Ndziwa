import React, {useCallback, useContext, useEffect, useRef, useState} from "react"
import { 
    TextInput, 
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    ViewComponent,
    ScrollView,
    ActivityIndicator
} from "react-native"
import { COLORS, SIZES, FONTS, icons, images } from "../../constants"


/**
 * Crée un champ de type text en utilisant des champs non controlés
 * 
 * @param {{
 *  type: string, 
 *  name: string, 
 *  maxLength: number,
 *  multiline: boolean,
 *  errors: Objec,
 *  autoFocus: boolean, 
 *  state: {value, setValue}, 
 *  style: Object
 * }} props 
 * @returns { ViewComponent }
 */
const TextField = ({type="default", maxLength, multiline=false, autoFocus=false, name, errors, state={}, style={}, children}) => {
    
    return (
        <>
            <TextInput 
                style={[styles.input, style, {borderColor: errors && errors[name] ? COLORS.red : style.borderColor || 'transparent'}]}
                keyboardType={type} 
                multiline={multiline}
                maxLength={maxLength}
                autoFocus={autoFocus}
                value={state.value}
                placeholder={children} 
                placeholderTextColor={style.color || COLORS.black}  
                onChangeText={text => {state.setValue(text); if (errors != null) errors[name] = null}}
            />

            {errors && errors[name] &&
                <Text style={{color: COLORS.red, fontSize: SIZES.padding * 1.5}}>{errors[name]}</Text>
            }
        </>
    )
}

/**
 * saisir un mot de passe
 * 
 * @param {{
 *  name: string, 
 *  state: {value, setValue}, 
 *  loading: boolean, 
 *  errors: Object
 * }} props
 * 
 * @returns 
 */
const PasswordField = ({name, state={}, loading, errors, children}) => {
    const [showPassword, setShowPassword] = useState(true)

    return(
        <View style={styles.parent_input}>
            <TextInput 
                style={[styles.input, {borderColor: errors && errors[name] ? COLORS.red : COLORS.black}]}
                value={state.value}
                placeholder={children}
                placeholderTextColor={COLORS.black}
                secureTextEntry={showPassword}
                onChangeText={text => {state.setValue(text); if (errors != null) errors[name] = null}} 

            />
            <View style={{
                position: 'absolute',
                right: 7,
                top: 15,
                height: 30,
                width: 30
            }}>
                {loading
                    ?
                        <ActivityIndicator color={COLORS.black} />
                    : (
                        <TouchableOpacity 
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Image 
                                source={ showPassword ? icons.eye : icons.disable_eye}
                                style={{
                                    height: 23,
                                    width: 23,
                                    tintColor: COLORS.black
                                }}
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
            {errors && errors[name] &&
                <Text style={{color: COLORS.red, fontSize: SIZES.padding * 1.3}}>{errors[name]}</Text>
            }
        </View>
    )
}

/**
 * Crée un button de soumission
 * 
 * @param {{ onClick: CallableFunction, children: ChildNode, style: Object|null }} 
 * @returns {TouchableOpacity}
 */
 const ButtonSubmit = ({onCLick, children, style}) => {
    const handleClick = () => {
        onCLick()
        console.log(onCLick)
    }
    return (
        <TouchableOpacity onPress={handleClick} style={[styles.btn, style]}>
            <Text style={styles.btn_text}>{children}</Text>
        </TouchableOpacity>
    )
}

/**
 * Crée un champ de type text utilisable dans un context
 * 
 * @param {React.Context} context
 * @param {string} name
 * @param {string} type 
 * @param {Object} errors
 * @param {Component} children
 * @returns { ViewComponent }
 */
 const TextFieldContext = ({context, name, type="text", errors, helper=null, children}) => {
    const data = useContext(context)
    const handleChange = useCallback((name, value) => {
        if (errors != null) {
            errors[name] = null
        }
        data.change(name, value)
    }, [data.change])

    return (
        <ScrollView style={styles.parent_input}>
            <TextInput 
                style={[styles.input, {borderColor: errors && errors[name] ? COLORS.red : COLORS.black}]}
                name={name}
                value={data[name] || ''}
                keyboardType={type} 
                placeholder={children} 
                placeholderTextColor={COLORS.black} 
                onChangeText={value => handleChange(name, value)} 
            />
            {errors && errors[name] &&
                <Text style={{color: COLORS.red, fontSize: SIZES.padding * 1.5}}>{errors[name]}</Text>
            }
            {helper && 
                <Text style={{color: COLORS.gray, paddingLeft: 5, fontSize: SIZES.padding * 1.4}}>{helper}</Text>
            }
        </ScrollView>
    )
}

/**
 * 
 * @param {React.Context} context 
 * @returns 
 */
const TelFieldContext = ({context, name, country, errors=null, helper, children}) => {
    const data = useContext(context)
    const handleChange = useCallback((name, value) => {
        if (errors != null) {
            errors[name] = null
        }
        data.change(name, value)
    }, [data.change])
    
    return (
        <ScrollView style={styles.parent_input}>
            <View style={[
                styles.input, 
                {
                    flexDirection: "row", 
                    paddingHorizontal: 5, 
                    alignItems: "center", 
                    borderColor: errors && errors[name] ? COLORS.red : COLORS.black
                }
            ]}>
                <TouchableOpacity 
                    style={{
                        width: 90,
                        flexDirection: "row",
                        ...FONTS.body2,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {Object.values(country).length === 0 
                        ?
                            <Text style={{color: COLORS.black, fontSize: SIZES.padding * 1.6}}>Code</Text>
                        :
                        <>
                            <View style={{justifyContent: "center"}}>
                                <Image 
                                    source={{uri: country?.flag}}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 50
                                    }}
                                />
                            </View>
                            <View style={{justifyContent: "center", marginHorizontal: 5}}>
                                <Text style={{color: COLORS.black, ...FONTS.body3}}>{country?.code_appel}</Text>
                            </View>
                        </>
                    }
                    
                </TouchableOpacity>
                <View style={{
                    backgroundColor: COLORS.lightpurple, 
                    width: 2,
                    height: "50%",
                    alignItems: "center",
                    justifyContent: "center"
                }}></View>
                <TextInput 
                    style={{
                        fontSize: SIZES.padding * 1.8,
                        paddingHorizontal: SIZES.padding * 0.6,
                        color: COLORS.black,
                        flex: 3
                    }}
                    name={name}
                    value={data[name] || ''}
                    keyboardType="phone-pad"
                    placeholder={children} 
                    placeholderTextColor={COLORS.black} 
                    onChangeText={value => handleChange(name, value)} 
                    maxLength={7}
                />
            </View>
            {errors && errors[name] &&
                <Text style={{color: COLORS.red, fontSize: SIZES.padding * 1.5}}>{errors[name]}</Text>
            }
            {helper && 
                <Text style={{color: COLORS.gray, paddingLeft: 5, fontSize: SIZES.padding * 1.4}}>{helper}</Text>
            }
        </ScrollView>
    )
}

/**
 * verification du code sms
 * 
 * @param {{
 *  onSubmit: CallableFunction,
 *  errors: null|Object,
 * }} props
 * 
 * @returns {ViewComponent}
 */
const SmsVerify = ({errors=null, onSubmit}) => {

    const refTextOne = useRef(null)
    const refTextTwo = useRef(null)
    const refTextThree = useRef(null)
    const refTextFour = useRef(null)
    const [sms, setSms] = useState({})

    useEffect(() => {
        if (Object.values(sms).length === 4) {
            let value = Object.values(sms).join('')
            onSubmit(value)
        }
    }, [sms])
    
    return (
        <ScrollView>
            {errors !== null &&
                <Text style={{color: COLORS.red, fontSize: SIZES.padding * 1.8, textAlign: "center", marginTop: SIZES.padding * 2}}>{errors.errors || errors}</Text>
            }
            <View style={styles.smsContainer}>
                <View style={styles.smsBox}>
                    <TextInput
                        keyboardType="phone-pad"
                        maxLength={1}
                        style={styles.smsInput}
                        ref={refTextOne}
                        onChangeText={value => {
                            setSms(s => ({ ...s, 1: value }))
                            value && refTextTwo.current.focus()
                        }}
                    />
                </View>

                <View style={styles.smsBox}>
                    <TextInput
                        keyboardType="phone-pad"
                        maxLength={1}
                        value={refTextTwo}
                        style={styles.smsInput}
                        ref={refTextTwo}
                        onChangeText={value => {
                            setSms(s => ({ ...s, 2: value }))
                            value ? refTextThree.current.focus() : refTextOne.current.focus()
                        }}
                    />
                </View>

                <View style={styles.smsBox}>
                    <TextInput
                        keyboardType="phone-pad"
                        maxLength={1}
                        style={styles.smsInput}
                        value={refTextThree}
                        ref={refTextThree}
                        onChangeText={value => {
                            setSms(s => ({ ...s, 3: value }))
                            value ? refTextFour.current.focus() : refTextTwo.current.focus()
                        }}
                    />
                </View>

                <View style={styles.smsBox}>
                    <TextInput
                        keyboardType="phone-pad"
                        maxLength={1}
                        value={refTextFour}
                        style={styles.smsInput}
                        ref={refTextFour}
                        onChangeText={value => {
                            setSms(s => ({ ...s, 4: value }))
                            !value && refTextThree.current.focus()
                        }}
                    />
                </View>
            </View>
            <View style={{paddingHorizontal: 10, marginBottom: SIZES.padding * 1.4}}>
                <Text style={{color: COLORS.black, marginRight: 10, fontSize: SIZES.padding * 1.5}}>N'avez vous pas reçu de code ? </Text>
                <TouchableOpacity>
                    <Text style={{color: COLORS.green, fontSize: SIZES.padding * 1.5, marginTop: 6}}>Renvoyer le code</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const SelectField = ({children, onClick, name, errors, helper}) => {
    
    return (
        <View 
            style={[styles.parent_input, {}]}
        >
            <TouchableOpacity 
                style={[
                    styles.input, 
                    {
                        height: 55,
                        flexDirection: "row", 
                        paddingHorizontal: 12, 
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderColor: errors && errors[name] ? COLORS.red : COLORS.black
                    }
                ]}
                onPress={() => (onClick(r => ({ ...r, [name]: true})))}
            >
            <Text style={{fontSize: SIZES.padding * 1.8, color: COLORS.black}}>{children}</Text>
            <Image 
                source={icons.down}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.black
                }}
                
            />
            </TouchableOpacity>
            {errors && errors[name] &&
                <Text style={{color: COLORS.red, fontSize: SIZES.padding * 1.5}}>{errors[name]}</Text>
            }
            {helper && 
                <Text style={{color: COLORS.gray, paddingLeft: 5, fontSize: SIZES.padding * 1.4}}>{helper}</Text>
            }
        </View>
    )
}

/**
 * créer un champ de type password utilisable dans un context
 * 
 * @param {React.Context} context
 * @param {string} name
 * @param {Object} errors
 * @param { Component } children 
 * @returns {ViewComponent}
 * 
 */
 const PasswordFieldContext = ({context, name, helper, errors, children}) => {

    const [showPassword, setShowPassword] = useState(true)
    const data = useContext(context)
    const handleChange = useCallback((value) => {
        if (errors != null) {
            errors[name] = null
        }
        data.change(name, value)
    }, [data.change])

    return(
        <View style={styles.parent_input}>
            <TextInput 
                style={[styles.input, {borderColor: errors && errors[name] ? COLORS.red : COLORS.black}]}
                value={data[name] || ''}
                placeholder={children}
                placeholderTextColor={COLORS.black}
                secureTextEntry={showPassword}
                onChangeText={value => handleChange(value)} 

            />
            <TouchableOpacity 
                style={{
                    position: 'absolute',
                    right: 7,
                    top: 15,
                    height: 30,
                    width: 30
                }}
                onPress={() => setShowPassword(p => !p)}
            >
                <Image 
                    source={ showPassword ? icons.eye : icons.disable_eye}
                    style={{
                        height: 23,
                        width: 23,
                        tintColor: COLORS.black
                    }}
                />
            </TouchableOpacity>
            {errors && errors[name] &&
                <Text style={{color: COLORS.red, fontSize: SIZES.padding * 1.5}}>{errors[name]}</Text>
            }
            {helper && 
                <Text style={{color: COLORS.gray, paddingLeft: 5, fontSize: SIZES.padding * 1.4}}>{helper}</Text>
            }
        </View>
    )
}


/**
 * Crée un button de soumission utilisé dans un context
 * 
 * @param {React.Context} context
 * @param {string} color
 * @param {Object} style
 * @param {CallableFunction} onSubmit fonction à appeller lorsque on submit
 * @param {Component} children 
 * @returns {TouchableOpacity}
 */
 const ButtonSubmitContext = ({context, color, disabled=false, onSubmit, style, children}) => {
    const value = useContext(context)
    const handleSubmit = useCallback(() => {
        onSubmit(value)
    }, [onSubmit, value])

    return (
        <TouchableOpacity disabled={disabled} onPress={handleSubmit} style={[style || styles.btn, {backgroundColor: disabled ? "#cfcfcfcf" : COLORS.black }]}>
            <Text style={[styles.btn_text, {color: color || COLORS.white }]}>{children}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    parent_input: {
        marginBottom: SIZES.padding * 2,
    },

    input: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 10,
        paddingHorizontal: SIZES.padding * 2,
        color: COLORS.black,
        fontSize: SIZES.padding * 1.5,
    },

    btn: {
        minWidth: 125,
        height: 50,
        backgroundColor: COLORS.black,
        borderRadius: SIZES.radius / 1.5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SIZES.padding * 1.5
    },

    btn_text: {
        fontWeight: 'bold',
        color: COLORS.white, ...FONTS.h3,
    },

    smsContainer: {
        marginVertical: SIZES.padding * 1.8,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingHorizontal: SIZES.padding * 2,
    },

    smsBox: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.green,
        marginHorizontal: SIZES.padding * 3
    },

    smsInput: {
        fontSize: SIZES.padding * 3,
        textAlign: "center",
        padding: 0,
        paddingHorizontal: 18,
        paddingVertical: 10,
        color: COLORS.black


    }
})

export { 
    TextField, 
    PasswordField, 
    ButtonSubmit, 
    TextFieldContext, 
    PasswordFieldContext,
    ButtonSubmitContext,
    TelFieldContext,
    SelectField, 
    SmsVerify,
}
