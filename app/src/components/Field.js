import React, {useCallback, useContext, useEffect, useRef, useState} from "react"
import { 
    TextInput, 
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    ViewComponent
} from "react-native"
import { COLORS, SIZES, FONTS, icons, images } from "../../constants"

/**
 * créer un champ de type password
 * 
 * @param { Component } children 
 * @returns {ViewComponent}
 * 
 */
const PasswordField = ({children}) => {

    const [showPassword, setShowPassword] = useState(true)

    return(
        <View>
            <TextInput 
                style={styles.input} 
                placeholder={children}
                placeholderTextColor={COLORS.lightGreen}
                secureTextEntry={showPassword}
            />
            <TouchableOpacity 
                style={{
                    position: 'absolute',
                    right: 7,
                    bottom: 13,
                    height: 30,
                    width: 30
                }}
                onPress={() => setShowPassword(!showPassword)}
            >
                <Image 
                    source={ showPassword ? icons.eye : icons.disable_eye}
                    style={{
                        height: 23,
                        width: 23,
                        tintColor: COLORS.white
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

/**
 * Crée un champ de type text
 * 
 * @param {string} type 
 * @param {ViewComponent} children
 * @returns { ViewComponent }
 */
const TextField = ({type="text", children}) => {
    return (
        <View style={styles.parent_input}>
            <TextInput 
                style={styles.input}
                keyboardType={type} 
                placeholder={children} 
                placeholderTextColor={COLORS.lightGray}  
            />
        </View>
    )
}

/**
 * Crée un button de soumission
 * 
 * @param {CallableFunction} onSubmit fonction à appeller lorsque on submit
 * @param {Component} children 
 * @returns {TouchableOpacity}
 */
 const ButtonSubmit = ({onSubmit, children}) => {
    return (
        <TouchableOpacity onPress={onSubmit} style={styles.btn}>
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
        if (errors !== null) {
            errors[name] = null
        }
        data.change(name, value)
    }, [data.change])

    return (
        <View style={styles.parent_input}>
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
        </View>
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
        if (errors !== null) {
            errors[name] = null
        }
        data.change(name, value)
    }, [data.change])
    
    return (
        <View style={styles.parent_input}>
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
        </View>
    )
}

/**
 * verification du code sms
 * 
 * @param {string} name
 * @param {Object} errors
 * @param {ViewComponent} children 
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
        <View>
            {errors !== null &&
                <Text style={{color: COLORS.red, fontSize: SIZES.padding * 1.8, textAlign: "center", marginTop: SIZES.padding * 2}}>{errors.errors}</Text>
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
                <Text style={{color: COLORS.black, marginRight: 10, fontSize: SIZES.padding * 1.5}}>N'avez vous pas recu de code ? </Text>
                <TouchableOpacity>
                    <Text style={{color: COLORS.green, fontSize: SIZES.padding * 1.5, marginTop: 6}}>Renvoyer le code</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const SelectField = ({children, onClick, name, errors, helper}) => {
    
    return (
        <View 
            style={styles.parent_input}
        >
            <TouchableOpacity 
                style={[
                    styles.input, 
                    {
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
    const handleChange = useCallback((name, value) => {
        if (errors !== null) {
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
                onChangeText={value => handleChange(name, value)} 

            />
            <TouchableOpacity 
                style={{
                    position: 'absolute',
                    right: 7,
                    top: 15,
                    height: 30,
                    width: 30
                }}
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
        marginBottom: SIZES.padding * 1.4
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 10,
        paddingHorizontal: SIZES.padding * 1.5,
        color: COLORS.black,
        fontSize: SIZES.padding * 1.5,
    },

    btn: {
        minWidth: 110,
        height: 50,
        backgroundColor: COLORS.black,
        borderRadius: SIZES.radius / 1.5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SIZES.padding * 2
    },

    btn_text: {
        fontWeight: 'bold',
        color: COLORS.white, ...FONTS.h3,
    },

    smsContainer: {
        marginVertical: SIZES.padding * 4,
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
