import React, {useState} from "react"
import { StyleSheet, Modal, View, Image, TouchableOpacity } from "react-native"
import { COLORS, FONTS, icons, images, SIZES } from "../../../constants"
import { TextField } from "../Field"


/**
 * 
 * @param {{
 *  label: string,
 *  step: number,
 *  name: string,
 *  keyboardType: string,
 *  maxLength: number,
 *  multiline: boolean,
 *  modal: {visible: boolean, prev: CallableFunction, next: CallableFunction}
 * 
 * }} props 
 * @returns 
 */
export const TransactionModal = ({label, step, maxLength, multiline, name, modal, keyboardType}) => {
    const [value, setValue] = useState("")
    
    return (
        <View
            style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "green"
            }}
        >
            {modal.visible &&

                <View style={styles.field_content}>
                    <View style={[styles.field, {
                        flexDirection: step === 2 ? "row" : "column",
                        paddingHorizontal: step === 2 ? 5 : 0,
                        justifyContent: "space-between",
                        alignItems: step === 2 ? "flex-end" : "flex-start",
                        maxHeight: 90,
                        minHeight: 45,
                    }]}>
                        {step === 2 &&
                            <TouchableOpacity 
                                style={{
                                    backgroundColor: COLORS.hideWhite,
                                    width: 35,
                                    height: 35,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 8,
                                    borderRadius: 999,
                                }}
                                onPress={() => modal.prev()}
                            >
                                <Image 
                                    resizeMode="contain"
                                    source={icons.back}
                                    style= {{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.green
                                    }}
                                />
                            </TouchableOpacity>
                        }
                        <TextField
                            name={name}
                            style={{
                                color: COLORS.gray, 
                                paddingHorizontal: step === 2 ? 10 : 15, 
                                fontSize: SIZES.padding * 1.7,
                                width: "85%",
                                borderRadius: 999,
                            }}
                            maxLength={maxLength}
                            multiline={multiline}
                            state={{value, setValue}}
                            type={keyboardType}
                        >
                            {label}
                        </TextField>
                    </View>
                    <TouchableOpacity 
                        onPress={() => modal.next(value)}
                        disabled={value === '' && step !== 2 ? true : false}
                        style={{
                            width: 44,
                            height: 44,
                            backgroundColor: value !== '' || step === 2 ? COLORS.green : COLORS.black,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 999  
                        }}
                        
                    >
                        <Image 
                            resizeMode="contain"
                            source={step === 2 ? icons.send : icons.next}
                            style={{
                                width: 25, 
                                height: 25, 
                                tintColor: COLORS.white,
                                marginRight: 3
                            }}
                        />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    field_content: {
        backgroundColor: COLORS.black,
        width: "100%",
        position: "absolute",
        bottom: 0,
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: 5,
        flexDirection: "row",
        zIndex: 10,
    },

    field: {
        backgroundColor: COLORS.hideWhite,
        width: "83%",
        borderRadius: SIZES.radius,
        justifyContent: "center",
    }
})