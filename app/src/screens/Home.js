import React, { useCallback, useEffect, useState } from "react"
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native"
import { activateMyAccount, isAuthenticated } from "../functions/auth"
import Spinner from "react-native-loading-spinner-overlay"
import { COLORS, FONTS, icons, images, SIZES } from "../../constants"
import LinearGradient from "react-native-linear-gradient"
import { ButtonSubmit, TextField } from "../components/Field"
import { ModalWithDataEntry } from "../components/Modals"


const Home = ({navigation}) => {

	const { data, authenticated, loadingIsAuthenticate, is } = isAuthenticated()
	const [modalVisible, setModalVisible] = useState(false)
	const { loading, errors, activate } = activateMyAccount()

	useEffect(() => {
		is()
	}, [])
	
	useEffect(() => {
		if (authenticated === false) {
			navigation.navigate('connexion')
		}
	}, [authenticated])

	const handleSubmitNin = useCallback(async (value) => {
		const response = await activate({'nin': value})
		
		if (response !== undefined) {
			is()
			setModalVisible(false)
		}
	}, [])

	//component
	/**
	 * Un modal pour l'activation du compte de l'utilisateur courant
	 * 
	 */
	const RenderModal = useCallback(() => {
		const [value, setValue] = useState(null)

		return <ModalWithDataEntry 
			params={{
				animationType: "fade",
				transparent: true
			}} 
			state={{modalVisible, setModalVisible}}
			height={220}
		>
			<Text style={{
				marginBottom: 20,
				color: COLORS.black
			}}>
				Votre NIN doit être saisit pour activer votre compte !
			</Text>
			<TextField
				type="numeric" 
				style={{
					borderColor: COLORS.green
				}}
				state={{value, setValue}}
				name="nin"
				errors={errors.errors}
			>
				NIN
			</TextField>
			<View style={{
				width: "100%",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "flex-end",				
			}}>
				<TouchableOpacity onPress={() => setModalVisible(false)}>
					<Text style={{
						paddingVertical: 12,
						color: COLORS.black,
						marginRight: 10
					}}>Annuler</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handleSubmitNin(value)}>
					<Text style={{
						paddingVertical: 12,
						color: COLORS.black
					}}>Envoyer</Text>
				</TouchableOpacity>
			</View>
			
		</ModalWithDataEntry>
	}, [modalVisible, errors])

	
	/**
	 * RenderHeader Un header pour afficher les notifications, le solde ... 
	 * 
	 * @param {{user}}  
	 * @returns {LinearGradient}
	 */
	const RenderHeader = useCallback(({user}) => {
		console.log('header')
		return (
			<LinearGradient
				start={{x: 0.15, y: .2}} end={{x: 0.24, y: .0}}
				colors={[COLORS.white, COLORS.green]}
				style={{flex: 1}}
			>
					<TouchableOpacity 
						style={{
							alignItems: "flex-end",
							position: "absolute",
							right: 3,
							width: 80,
							height: SIZES.padding * 4,
							paddingTop: 10, 
							zIndex: 2
						}}
					>
						<View 
							style={{
								position: "relative", 
								height: "100%",
								width: 50,
								justifyContent: "center",
							}}
						>
							<Text
								style={{
									color: COLORS.white,
									backgroundColor: COLORS.red,
									textAlign: "center",
									borderRadius: SIZES.radius,
									position: "absolute",
									width: 25,
									height: 25,
									top: -2,
									right: 7,
									padding: 2
								}}
							>
								3
							</Text>
							<Image 
								source={icons.bell}
								style={{
										width: 25,
										height: 25,
										tintColor: COLORS.white
								}}
							/>
						</View>
					</TouchableOpacity>
					<View style={{
						height: SIZES.height / 2.3,
					}}>
						<ImageBackground 
							source={images.banner}
							resizeMode="cover"
							style={{
								flex: 1,
								justifyContent: "center",                         
							}}
						>
								<View 
									style={{
										flexDirection: "column",
										justifyContent: "center",
										alignItems: 'center',
										marginBottom: SIZES.padding * 2,
									}}
								>
									{ user.nin === null 
										?
										<>
											<View>
												<View style={[
												]}>
													<Text style={style.text}>Votre compte n'est pas activé.</Text>
													<Text style={style.text}>Activer votre compte !</Text>
												</View>
												<ButtonSubmit 
													style={{
														backgroundColor: COLORS.red,
														borderRadius: SIZES.radius * 0.3,
														width: 100,
														justifyContent: 'center',
														alignItems: 'center',
														marginLeft: 40,
														marginTop: 12
													}}
													onCLick={() => setModalVisible(true)}
												>
													Activer
												</ButtonSubmit>

											</View>
										</>
										:
										<>
											<Text style={style.text}>Votre solde </Text>
											<Text style={{
													color: COLORS.white, 
													...FONTS.h3,
													textAlign: "center",
													fontWeight: "bold"
													
											}}>
													{user.account.bourse} €
											</Text>
										</>
									}
								</View>
						</ImageBackground>
				</View>

			</LinearGradient>
		)
	}, [modalVisible])

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : null}
			style={{ flex: 1 }}
		>
			{loadingIsAuthenticate &&
				<Spinner visible={true} />
			}
			{authenticated && !loadingIsAuthenticate &&
				<ScrollView>
					<RenderHeader user={data.data}/>
				</ScrollView>
			}
			{/* modal */}
			<RenderModal />
		</KeyboardAvoidingView>
	)
}

const style = StyleSheet.create({
	text: {
		textAlign: "center",
		color: COLORS.white,
		fontWeight: '500'
	}
})

export default Home