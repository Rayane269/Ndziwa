import React from "react"
import { TouchableOpacity, Image, Text } from "react-native"
import { COLORS, FONTS, SIZES } from "../../constants"

const IconTextButton = ({icon, color, label, onPress, containerStyle}) => {
     
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 43,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...containerStyle
            }}
        >
            <Image 
                source={icon}
                resizeMode="contain"
                style={{
                    width: 20,
                    height: 20,
                    tintColor: color || COLORS.white
                }}
            />
            <Text style={{marginLeft: SIZES.padding, ...FONTS.h5, color: color || COLORS.white}}>{label}</Text>
        </TouchableOpacity>
    )
}

export default IconTextButton