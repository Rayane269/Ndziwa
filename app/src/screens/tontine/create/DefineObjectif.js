import React, { useRef, useState } from "react"
import MainLayout from "../../MainLayout"
import { View, 
    TouchableOpacity, 
    Text, 
    TextInput, 
    StyleSheet,
    Image,
    ActivityIndicator,
} from "react-native"
import { COLORS, FONTS, icons } from "../../../../constants"
import { useJsonFetch } from "../../../functions/hooks"
import { BASE_URL } from "../../../config"
import { TextField } from "../../../components/Field"

const DefineObjectif = ({navigation}) => {
    
    const {data, loading, errors, fetch} = useJsonFetch()
    const [fields, setFields] = useState({
        objectif: null,
        montant: null,
        frequence: null
    })

    const handleSendObjectif = async () => {
        const response = await fetch(
            `${BASE_URL}/api/tontine/create/first-step`,
            {
                method: "POST", 
                body: {
                    objectif: fields.objectif,
                    montant: 1,
                    frequence: 1
                }
            }
        )
        
        if (response !== undefined) {
            navigation.navigate('SendInvitation', {
                group: response
            })
        }
    }

    return (<MainLayout
			behavior={Platform.OS === "ios" ? "padding" : null}
			containerStyle={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20, backgroundColor: COLORS.black }}
		>
            <View style={styles.container}>
                <Text style={{
                    color: COLORS.white,
                    ...FONTS.h5,
                    marginBottom: 10
                }}>Titre pour votre projet</Text>
                <TextField 
                  state={{
                    value: fields.objectif,
                    setValue: setFields
                  }} 
                  name="objectif"
                  errors={errors.errors} 
                  style={{
                    color: COLORS.gray,
                    fontSize: 14,
                    borderColor: COLORS.gray,
                    borderWidth: 1
                  }}
                >
                    Exemple: Acheter un ordinateur
                </TextField>
            </View>
            <View style={styles.container}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Text style={{
                        color: COLORS.white,
                        ...FONTS.h5
                    }}>Montant cible (KMF)</Text>
                    <TextField 
                  state={{
                    value: fields.montant,
                    setValue: setFields
                  }} 
                  name="montant"
                  errors={errors.errors} 
                  style={{
                    color: COLORS.gray,
                    fontSize: 14,
                    borderColor: COLORS.gray,
                    borderWidth: 1,
                    width: 150
                  }}
                >
                    Montant
                </TextField>
                </View>
                <Text style={{
                    textAlign: "center",
                    color: COLORS.gray,
                    marginVertical: 5,
                    fontSize: 15
                }}>Le montant à verser régulierment</Text>
            </View>

            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{
                        color: COLORS.white,
                        ...FONTS.h5
                    }}>Fréquence des tours</Text>
                    <View>

                        <TouchableOpacity style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"

                        }}>
                            <Text style={{
                                color: COLORS.gray,
                                ...FONTS.h5
                            }}>Mensuelle</Text>
                            <Image 
                                source={icons.next}
                                style={{
                                    width: 28,
                                    height: 28,
                                    tintColor: COLORS.gray
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{
                    textAlign: "center",
                    color: COLORS.gray,
                    marginVertical: 5,
                    fontSize: 15
                }}>La fréquence des tours de paiement</Text>
            </View>
			
			<View style={{
				backgroundColor: COLORS.black,
				justifyContent: "center",
				alignItems: "center",
				paddingVertical: 8
			}}>
				<TouchableOpacity 
					style={{
						backgroundColor: COLORS.green,
						borderRadius: 50,
                        height: 50,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center"
					}}
					onPress={() => handleSendObjectif()}
				>
                    {loading 
                        ? <ActivityIndicator 
                            color={COLORS.white} 
                        /> 
                        : <Text style={{
                            fontSize: 18,
                            color: COLORS.white,
                            textAlign: "center"
                        }}>
                            Suivant
                        </Text>
                    }
				</TouchableOpacity>						
			</View>
		</MainLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.hideWhite,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 15
    }
})

export default DefineObjectif