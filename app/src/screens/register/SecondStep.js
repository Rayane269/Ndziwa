import React, {} from 'react'
import { 
    KeyboardAvoidingView,
    Platform,
    Text, 
    View 
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SIZES, FONTS, theme, icons, images } from '../../../constants'

const SecondStep = () => {
    return(
       <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? 'padding' : null}
            style={{flex: 1}}
       >
            <LinearGradient
                colors={[COLORS.lime, COLORS.emerald]}
                style={{ flex: 1 }}
            >

            </LinearGradient>
       </KeyboardAvoidingView> 
    )
}

export default SecondStep