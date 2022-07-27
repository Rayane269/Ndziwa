import React from "react"
import { COLORS, SIZES, images, icons } from "../../constants"
import { View, Image, TouchableOpacity, Text } from "react-native"


export const RenderLogo = () => {
    return (
        <View
            style={{
                marginTop: SIZES.padding,
                height: 80,
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

export const LastLink = ({navigation, link}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(link)}>
            <View
                style={{
                    marginTop: SIZES.padding * 2,
                    marginLeft: SIZES.padding * 2,
                    flexDirection: "row",
                    alignItems: 'center',
                }}
            >
                <Image 
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20
                    }}
                />
                <Text style={{ marginLeft: 10, color: COLORS.black }}>Précedent</Text>
            </View>
        </TouchableOpacity>
    )
}