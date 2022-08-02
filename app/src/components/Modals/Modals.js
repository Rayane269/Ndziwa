import React, { useCallback, useState } from "react"
import {
    Modal, 
    TouchableOpacity, 
    View, 
    Text,
    TouchableWithoutFeedback,
    Image,
    StyleSheet,
    ActivityIndicator
} from "react-native"
import { COLORS, icons, SIZES } from "../../../constants"
import { passwordConfirmation, setSmsVerify } from "../../functions/auth"
import { PasswordField, SmsVerify } from "../Field"


/**
 * Un modal avec des champs de saisit a l'interieur
 * 
 * @param {{
 *      params: {
 *          animationType: string,
 *          transparent: boolean
 *      },
 *      modal: {
 *          name: string
 *          modalVisible: boolean, 
 *          setModalVisible: CallableFunction,
 *      },
 *      submit: {
 *          value: any,
 *          onSubmit: CallableFunction
 *      },
 *      style: Object,
 *      width: number,
 *      height: number
 *  }} props
 * 
 * @returns {Modal} Modal
 */
export const ModalWithDataEntry = ({params, modal, submit, width, height, children}) => {

    if (!modal.modalVisible) return
    
    return <Modal visible={modal.modalVisible} {...params} >
        
            <View style={{
                flex: 1,
                backgroundColor: COLORS.hideWhite,
                alignItems: "center",
                justifyContent: "flex-start"
                
            }}>

                <View style={{
                    marginTop: SIZES.padding * 2,
                    padding: SIZES.padding * 1.5, 
                    width: width || SIZES.width * 0.9,
                    height: height || 380,
                    backgroundColor: COLORS.white,
                    shadowColor: COLORS.black,
                    borderRadius: SIZES.radius * 0.5
                }}>
                    {children}
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        position: "absolute",
                        bottom: 12,
                        right: 25
                    }}>
                        <TouchableOpacity onPress={() => modal.setModalVisible(m => ({...m, [modal.name]: false}))}>
                            <Text style={{
                                paddingVertical: 5,
                                color: COLORS.black,
                                marginRight: 10
                            }}>Annuler</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => submit.onSubmit(submit.value)}>
                            <Text style={{
                                paddingVertical: 5,
                                color: COLORS.black
                            }}>Envoyer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    </Modal>
}


/**
 * affiche un modal pour saisir le mot de passe de l'utilisateur courrant
 * 
 * @param {{
 *  modal: {
 *      name: string, 
 *      modalVisible: boolean, 
 *      setModalVisible: CallableFunction
 *  }
 * nextAction
 * }} props
 * 
 */
export const ModalSetPassword = ({modal, nextAction}) => {

    if (!modal.modalVisible) return

    const {error, loading, confirm} = passwordConfirmation()
    const [password, setPassword] = useState(null)

    const handleSubmit = useCallback(async (data) => {
        const response = await confirm({"password": data})
        if (response !== undefined) {
            nextAction()
            modal.setModalVisible(m => ({...m, [modal.name]: false}))
        }
    }, [])

    return (
        <ModalWithDataEntry
            params={{
                animationType: "fade",
                transparent: true
            }}
            modal={modal}
            submit={{value: password, onSubmit: handleSubmit}}
            height={205}
        >
            <Text style={{
                color: COLORS.black,
                fontSize: SIZES.padding * 1.5,
                marginBottom: SIZES.padding * 1.5
            }}>
                Saisissez votre mot de passe avant d'aller plus loin.
            </Text>
            <PasswordField 
                name="password"
                state={{value: password, setValue: setPassword}}
                errors={error.errors}
                loading={loading}
            >
                Mot de passe
            </PasswordField>

        </ModalWithDataEntry>
    )
}

/**
 * 
 * @param {{modal: {visible: boolean, onClose}}} props 
 */
export const ModalShowInfo = ({modal, children}) => {
    if (!modal.visible) return
    return (
        <Modal
            animationType="slide"
            visible={modal.visible}
            transparent={true}
        >
            <TouchableWithoutFeedback
                onPress={() => modal.onClose()}
            >

                <View style={{
                    flex: 1,
                    backgroundColor: COLORS.transparent,
                    alignItems: "center",
                    justifyContent: "space-between"


                }}>
                    <View style={{
                        marginTop: SIZES.padding * 7,
                        padding: SIZES.padding * 1.5, 
                        width: SIZES.width * 0.85,
                        height: 200,
                        backgroundColor: COLORS.white,
                        shadowColor: COLORS.black,
                        borderRadius: SIZES.radius * 0.5,
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        {children}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

/**
 * affiche un modal pour saisir le code envoyé par sms
 * 
 * @param {{
 *  modal: {
 *      name: string, 
 *      modalVisible: boolean, 
 *      setModalVisible: CallableFunction
 *  }
 * nextAction
 * }} props
 * 
 */
export const ModalSetSmsCode = ({modal, nextAction}) => {

    const {verifying, errorSms, verify} = setSmsVerify()
    const [sms, setSms] = useState(null)

    const handlerVerifiy = async () => {
        const response = await verify({code: sms})
        if (response !== undefined) {
            modal.setModalVisible(m => ({...m, [modal.name]: false}))
            nextAction()
        }
    }
    
    return (
        <Modal
            visible={modal.modalVisible}
            transparent={true}
            
        >
            <View style={{
                flex: 1,
                ustifyContent: "center",
                alignItems: "center",
                marginTop: SIZES.padding * 3
            }}>
                <View style={{
                    backgroundColor: COLORS.white,
                    width: SIZES.width * 0.9,
                    paddingVertical: SIZES.padding * 2,
                    paddingHorizontal: SIZES.padding * 2,
                    height: 320,
                    borderRadius: SIZES.radius * .6
                }}>
                    <Text style={{
                        paddingHorizontal: SIZES.padding,
                        fontSize: SIZES.padding * 1.7,
                        color: COLORS.black
                    }}>
                        Entrez le code a 4 chiffres bla bla blaa
                    </Text>
                    <SmsVerify errors={errorSms.message} onSubmit={(data) => setSms(data)} />
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                    }}>
                        <TouchableOpacity 
                            style={[styles.btn, {
                                borderWidth: 1,
                                borderColor: COLORS.green
                            }]}
                            onPress={() => modal.setModalVisible(m => ({...m, [modal.name]: false}))}
                        >
                            <Text style={[styles.text, {
                                color: COLORS.green
                            }]}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.btn, {
                                marginLeft: 15,
                                backgroundColor: sms === null ? COLORS.hideBlack : COLORS.green
                            }]}
                            onPress={() => handlerVerifiy()}
                            disabled={sms === null}
                        >
                            {verifying ?
                                <ActivityIndicator size={20} />
                                :
                                <Text style={[styles.text]}>Suivant</Text>

                            }
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    btn: {
        height: 45,
        width: 90,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"

    },

    text: {
        color: COLORS.white,
        fontSize: SIZES.padding * 1.6,
        fontWeight: "bold"
    }
})