import React, { useCallback, memo } from "react"
import {
    Modal, 
    TouchableOpacity, 
    View, 
    Text, 
    TouchableWithoutFeedback
} from "react-native"
import { COLORS, SIZES } from "../../constants"


/**
 * Un modal avec des champs de saisit a l'interieur
 * 
 * @param {{
 *      params: {
 *          animationType: string,
 *          transparent: boolean
 *      },
 *      state: {
 *          modalVisible: boolean, 
 *          setModalVisible: CallableFunction,
 *          onSubmit: CallableFunction
 *      },
 *      style: Object,
 *      width: number,
 *      height: number
 *  }} params
 * 
 * @returns {Modal} Modal
 */
const ModalWithDataEntry = memo(({params, state, width, height, children}) => {
    
    return <Modal visible={state.modalVisible} {...params} >
        
            <View style={{
                flex: 1,
                backgroundColor: COLORS.transparent,
                alignItems: "center",
                justifyContent: "flex-start"
                
            }}>

                <View style={{
                    marginTop: SIZES.padding * 2,
                    padding: SIZES.padding * 1.5, 
                    width: width || SIZES.width * 0.9,
                    height: height || 380,
                    backgroundColor: COLORS.lightGreen,
                    shadowColor: COLORS.black,
                    borderRadius: SIZES.radius * 0.5
                }}>
                    {children}
                </View>
            </View>
    </Modal>
})

export {ModalWithDataEntry}