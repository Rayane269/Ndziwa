import React, {useCallback, useContext, useState} from "react"
import { 
    TextInput, 
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    ViewComponent
} from "react-native"
import { COLORS, SIZES, FONTS, icons } from "../../constants"

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
 const TextFieldContext = ({context, name, type="text", errors, children}) => {
    const data = useContext(context)
    const handleChange = useCallback((name, value) => {
        data.change(name, value)
    }, [data.change])

    return (
        <View style={styles.parent_input}>
            <TextInput 
                style={[styles.input, {borderColor: errors && errors[name] ? COLORS.red : COLORS.white}]}
                name={name}
                value={data[name] || ''}
                keyboardType={type} 
                placeholder={children} 
                placeholderTextColor={COLORS.lightGray} 
                onChangeText={value => handleChange(name, value)} 
            />
            {errors && errors[name] &&
                <Text style={{color: COLORS.red, fontSize: SIZES.padding * 1.5}}>{errors[name]}</Text>
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
 const PasswordFieldContext = ({context, name, errors, children}) => {

    const [showPassword, setShowPassword] = useState(true)
    const data = useContext(context)
    const handleChange = useCallback((name, value) => {
        data.change(name, value)
    }, [data.change])

    return(
        <View style={styles.parent_input}>
            <TextInput 
                style={[styles.input, {borderColor: errors && errors[name] ? COLORS.red : COLORS.white}]}
                value={data[name] || ''}
                placeholder={children}
                placeholderTextColor={COLORS.lightGreen}
                secureTextEntry={showPassword}
                onChangeText={value => handleChange(name, value)} 

            />
            <TouchableOpacity 
                style={{
                    position: 'absolute',
                    right: 7,
                    top: 20,
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
            {errors && errors[name] &&
                <Text style={{color: COLORS.red, fontSize: SIZES.padding * 1.5}}>{errors[name]}</Text>
            }
        </View>
    )
}

/**
 * Crée un button de soumission utilisé dans un context
 * 
 * @param {React.Context} context
 * @param {CallableFunction} onSubmit fonction à appeller lorsque on submit
 * @param {Component} children 
 * @returns {TouchableOpacity}
 */
 const ButtonSubmitContext = ({context, onSubmit, children}) => {
    const value = useContext(context)
    const handleSubmit = useCallback(() => {
        onSubmit(value)
    }, [onSubmit, value])

    return (
        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={styles.btn_text}>{children}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    parent_input: {
        marginBottom: SIZES.padding * 3,
    },

    input: {
        height: 60,
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 5,
        paddingHorizontal: SIZES.padding * 1.5,
        color: COLORS.lightGreen,
        fontSize: SIZES.padding * 1.8,
    },

    btn: {
        height: 60,
        backgroundColor: COLORS.black,
        borderRadius: SIZES.radius / 1.5,
        alignItems: "center",
        justifyContent: "center"  
    },

    btn_text: {
        fontWeight: 'bold',
        color: COLORS.white, ...FONTS.h3,
    }
})

export { 
    TextField, 
    PasswordField, 
    ButtonSubmit, 
    TextFieldContext, 
    PasswordFieldContext,
    ButtonSubmitContext,
}
