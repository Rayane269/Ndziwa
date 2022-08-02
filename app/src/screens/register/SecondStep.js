import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { 
    KeyboardAvoidingView,
    Platform,
    Text, 
    View,
    ScrollView,
    Image,
    ActivityIndicator,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, SIZES, FONTS, theme, icons, images } from '../../../constants'
import { FormContext } from '../../components/Context'
import { ButtonSubmitContext, TelFieldContext, SelectField } from '../../components/Field'
import { useJsonFetch } from '../../functions/hooks'
import { BASE_URL } from '../../config'
import { LastLink } from '../../components/Utils'

const SecondStep = ({navigation}) => {

    const FormCreateContext = createContext({})
    const [value, setValue] = useState({"telephone": null})
    const { data, loading, errors, fetch } = useJsonFetch(`${BASE_URL}/api/register/second-step`)
    const { data: regions, loading: loadingRegion, fetch: fetchRegions } = useJsonFetch(`${BASE_URL}/api/regions`)
    const [modalVisible, setModalVisible] = useState({
        region_id: false,
        areas: false
    })
    const [selected, setSelected] = useState({})
    useEffect(() => {
        fetchRegions()
    }, [])

    
    //functions
    const RenderFormContext = useCallback(({defaultValue, children}) => {
        
        return (
            <FormContext style={{padding: SIZES.padding * 2}} context={FormCreateContext} defaultValue={defaultValue}>
                <View style={{justifyContent: "center", alignItems: "center", marginBottom: SIZES.padding * 5}}>
                    <Text style={{
                        justifyContent: "center",
                        color: COLORS.black, ...FONTS.h1
                    }}>Inscription</Text>
                    <Text style={{
                        marginTop: SIZES.padding * 1.3,
                        fontSize: SIZES.padding * 1.9,
                        textAlign: "center",
                        color: COLORS.black,
                        paddingVertical: 1,
                    }}>
                        Enregistrement des informations supplémentaires
                    </Text>
                </View>
                {children}
            </FormContext>
        )
    })
    const RenderRegionModal = useCallback(() => {

        const renderItem = ({item}) => {

            return (
                <TouchableOpacity
                    style={{padding: SIZES.padding, flexDirection: 'row'}}
                    onPress={() => {
                        setSelected(item)
                        setModalVisible(m => ({ ...m, region_id: false }))
                    }}
                
                >
                    <Image 
                        source={{uri: item.flag}}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    />
                    <Text style={{...FONTS.body4, color: COLORS.black}}>{item.nom}</Text>
                </TouchableOpacity>
            )
        } 

        return <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible.region_id}
        >
            <TouchableWithoutFeedback
                onPress={() => setModalVisible(m => ({ ...m, region_id: false}))}
            >
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.transparent
                }}>
                    <View
                        style={{
                            height: 380,
                            width: SIZES.width * 0.92,
                            backgroundColor: COLORS.lightGray,
                            borderRadius: SIZES.radius
                        }}
                    >
                        <FlatList 
                            data={regions}
                            renderItem={renderItem}
                            keyExtractor={item => item.code}
                            showsVerticalScrollIndicator={false}
                            style={{
                                padding: SIZES.padding * 2,
                                marginBottom: SIZES.padding * 2
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    })
    const handleSubmit = useCallback(async (value) => {
        setValue(v => ({ ...v, telephone: value.telephone}))
        const response = await fetch(null, {
            method: "POST",
            body: value
        })
        
        if (response !== undefined) {
            navigation.navigate('inscription_step_3')
        }
        
    }, [])

    return(
       <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? 'padding' : null}
            style={{flex: 1}}
       >
            <LinearGradient
                start={{x: 0.15, y: .2}} end={{x: 0.24, y: .0}}
                colors={[COLORS.white, COLORS.green]}
                style={{flex: 1}}
            >
                <ScrollView >
                    <LastLink navigation={navigation} link="inscription_step_1" />
                    <RenderFormContext defaultValue={{"region_id": selected.id, "telephone": value.telephone}}>
                        <SelectField
                            context={FormCreateContext} 
                            name="region_id"
                            onClick={setModalVisible}
                            errors={selected.id === undefined ? errors.errors : ''}
                        >
                            {selected.nom || "Selectionnez votre pays"}
                        </SelectField>
                        
                        <TelFieldContext  
                            context={FormCreateContext} 
                            errors={errors.errors}
                            country={selected}
                            name="telephone" 
                            type="phone-pad" 
                            helper="* Veuillez entrer votre numéro de téléphone. Vous allez recevoir un SMS pour confirmer le numéro de téléphone."
                        >
                            Téléphone
                        </TelFieldContext>
                        
                        <View style={{
                            flexDirection: "row", 
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginTop: SIZES.padding * 10,
                            marginBottom: 20,
                            borderColor: COLORS.black
                            
                        }}>
                            <ButtonSubmitContext 
                                context={FormCreateContext}
                                onSubmit={handleSubmit}
                                disabled={loading}
                            >
                                { loading ? <ActivityIndicator color={COLORS.black} size="small" /> : `Suivant`}
                            </ButtonSubmitContext>
                        </View>
                    </RenderFormContext>
                    <RenderRegionModal />
                </ScrollView>

            </LinearGradient>
       </KeyboardAvoidingView> 
    )
}

export default SecondStep