import React, { useEffect, useRef } from "react"
import { Animated, KeyboardAvoidingView, ScrollView, View } from "react-native"
import IconTextButton from "../components/IconTextButton"
import { useSelector } from "react-redux"
import { COLORS, icons, SIZES } from "../../constants"
import { transactionModalSelector } from "../stores/selectors"
import { useNavigation } from "@react-navigation/native"

const MainLayout = ({children, behavior=null, containerStyle}) => {
    
    const navigation = useNavigation()
    const modalAnimatedValue = useRef(new Animated.Value(0)).current
    const transactionModalVisible = useSelector(transactionModalSelector)
    
    useEffect(() => {
        if (transactionModalVisible) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
    }, [transactionModalVisible])

    const modalY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 243]
    })

    const onClickButton = () => {
        navigation.navigate("UserList")
    }

    return (
        <KeyboardAvoidingView behavior={behavior} style={containerStyle}>
                {children}

            {/* Color Background */}
            {transactionModalVisible &&
                <Animated.View 
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: COLORS.hideWhite
                    }}
                    opacity={modalAnimatedValue}
                />
            }

            {/* Modal */}
            <Animated.View
                style={{
                    position: "absolute",
                    left: 0,
                    top: modalY,
                    width: "100%",
                    padding: 20,
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: SIZES.radius,
                    borderTopRightRadius: SIZES.radius
                }}
            >
                <IconTextButton 
                    label="Transfert"
                    icon={icons.send}
                    containerStyle={{
                        backgroundColor: COLORS.black
                    }}
                    onPress={() => onClickButton()}
                />
                <IconTextButton 
                    label="Demande"
                    icon={icons.bill}
                    containerStyle={{
                        marginTop: SIZES.padding,
                        marginBottom: 10,
                        backgroundColor: COLORS.black
                    }}
                    onPress={() => onClickButton()}
                />
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

export default MainLayout