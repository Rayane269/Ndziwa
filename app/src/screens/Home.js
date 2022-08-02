import React, { useCallback, useEffect, useState } from "react"
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, FlatList, ActivityIndicator } from "react-native"
import { activateMyAccount, isAuthenticated } from "../functions/auth"
import { COLORS, FONTS, icons, images, SIZES } from "../../constants"
import LinearGradient from "react-native-linear-gradient"
import { ButtonSubmit, TextField } from "../components/Field"
import { ModalSetPassword, ModalWithDataEntry } from "../components/Modals"
import { ModalSetSmsCode } from "../components/Modals/Modals"


const Home = ({navigation}) => {

	const { data, authenticated, loadingIsAuthenticate, is } = isAuthenticated()
	const [payee, setPayee] = useState(null)
	const [telephone, setTelephone] = useState(null)
	const [modalVisible, setModalVisible] = useState({
		nin: false,
		password: false,
	})
	const { loading, errors: accountError, activate } = activateMyAccount()
	const lists = [
		{id: 1, nom: "azad", prenom: "yoma", telephone: "3331328"},
		{id: 2, nom: "Abdoul-wahid", prenom: "Hassani", telephone: "3255924"},
		{id: 3, nom: "Hilma", prenom: "Abdou", telephone: "3331328"},
		{id: 4, nom: "Aida", prenom: "Moussa", telephone: "3331328"},
		{id: 5, nom: "Imamou", prenom: "Mina", telephone: "3331328"},
		{id: 6, nom: "Raida", prenom: "Youssouf", telephone: "3331328"},
		{id: 7, nom: "Aboudou", prenom: "Chaida", telephone: "3331328"},
	]
	
	useEffect(() => {
		is()
	}, [])

	//handler

	/**
	 * 
	 * @param {string} value
	 * @return {void}
	 */
	const handleSubmitNin = useCallback(async (value) => {
		console.log(value, 'hentai')
		const response = await activate({'nin': value})
		
		if (response !== undefined) {
			is()
			setModalVisible(m => ({...m, nin: false}))
		}
	}, [])

	const handleRequestMoney = useCallback((item) => {
		console.log(item)
	}, [])

	const handleSentMoney = useCallback((item) => {
		console.log(item)
	}, [])
	
	//component

	/**
	 * Un modal pour saisir le nin et activer le compte de l'utilisateur courant
	 * @returns 
	 */
	const ModalSetNin = useCallback(() => {
		const [value, setValue] = useState(null)

		return <ModalWithDataEntry 
			params={{
				animationType: "fade",
				transparent: true
			}} 
			modal={{
				name: "nin",
				modalVisible: modalVisible.nin, 
				setModalVisible
			}}
			submit={{
				value: value,
				onSubmit: (value) => handleSubmitNin(value)
			}}

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
				errors={accountError.errors}
			>
				NIN
			</TextField>
		</ModalWithDataEntry>
	}, [modalVisible.nin, accountError])

	
	/**
	 * header pour afficher les notifications, le solde ... 
	 * 
	 * @param {{user}}  
	 * @returns 
	 */
	const RenderHeader = useCallback(({user}) => {
		console.log(user)
		return (
			<View style={{backgroundColor: COLORS.hideWhite, marginBottom: SIZES.padding * 2}}>
				<View 
					style={{
						alignItems: "flex-end",
						position: "relative",
						width: "100%",
						height: SIZES.padding * 3,
						paddingTop: 5,
					}}
				>
					<TouchableOpacity 
						style={{
							position: "relative", 
							height: "100%",
							width: 50,
							justifyContent: "center"
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
								top: 0,
								right: 5,
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
					</TouchableOpacity>
				</View>

				<View style={{
					height: SIZES.height / 4,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}>
					<View style={{
						flex: 1,
						paddingHorizontal: 5
					}}>
						<Text style={{
							fontSize: SIZES.padding * 2.4,
							color: COLORS.green,
							marginBottom: 5,						
						}}>
							Hello {user.fullName} !
						</Text>
						<Text style={{color: COLORS.white, fontSize: SIZES.padding * 1.6}}>Votre solde est de </Text>

					</View>
					<View style={{flex: 1}}>
						<ImageBackground 
							source={images.banner}
							resizeMode="contain"
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center"
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
									<Text style={{
											color: COLORS.white, 
											...FONTS.h4,
											textAlign: "center",
											fontWeight: "bold",
											marginTop: SIZES.padding * 4,
											marginLeft: 8
											
									}}>
											{user.account.bourse}
									</Text>
									<Text style={{color: COLORS.white, marginTop: 3, fontWeight: "bold"}}>{user.region.devise}</Text>
								</View>
						</ImageBackground>
					</View>

				</View>
			</View>
		)
	}, [modalVisible.nin])

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : null}
			style={{ flex: 1, marginBottom: SIZES.padding * 6, backgroundColor: COLORS.black}}
		>
			{loadingIsAuthenticate && !authenticated &&
				<ActivityIndicator style={{marginTop: SIZES.padding * 2}} size={30} color={COLORS.green} />
			}
			{authenticated && !loadingIsAuthenticate &&
				<>
					{ data.data.nin == null 
						? (
							<View style={{
								alignItems: "center",
								justifyContent: "center",
								height: SIZES.height
							}}>
								<View>
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
										marginTop: 12
									}}
									onCLick={() => setModalVisible(m => ({...m, nin: true}))}
								>
									Activer
								</ButtonSubmit>

							</View>
						) : 
						(
							<ScrollView showsVerticalScrollIndicator={false} >

								{/* header */}
								<RenderHeader user={data.data}/>

								{/* sent and request money */}
								<View style={[style.section, {paddingVertical: SIZES.padding * 1.2}]}>
									<Text style={[
										style.title, 
										{
											paddingHorizontal: SIZES.padding * 1.2
										}
									]}>
										Envoie et demande d'argent
									</Text>
									<View style={{paddingLeft: SIZES.padding}}>
										<FlatList
											keyExtractor={item => (item.id)}
											horizontal
											showsHorizontalScrollIndicator={false}
											data={lists}
											renderItem={({item, index}) => {
												return (
													<View style={{
														marginRight: 10,
														justifyContent: "center"
													}}>
														{index === lists.length - 1
														? (
															<View style={{
																width: 65,
																justifyContent: "center",
																alignItems: "center",
															}}>
																<TouchableOpacity style={{
																	width: 62,
																	height: 62,
																	justifyContent: "center",
																	alignItems: "center",
																	borderRadius: SIZES.radius,	
																	backgroundColor: COLORS.green
																}}>
																	<Image resizeMode="contain" style={{width: 30, tintColor: COLORS.white}} source={icons.all} />
																</TouchableOpacity>
															</View>

														) 
														: (
															<View 
																style={{
																	width: 190,
																	height: 240,
																	alignItems: "center",
																	backgroundColor: COLORS.hideWhite,
																	padding: 8,
																	borderRadius: 8
																	
																}}
															>
																<View 
																	style={{
																		width: "100%",
																		height: "40%",
																		backgroundColor: COLORS.lightBlue,
																		marginBottom: SIZES.padding * 2,
																		borderRadius: 8
																	}}
																>
																	<Image 
																		resizeMode="contain" 
																		style={{
																			width: "100%", 
																			height: "100%", 
																			tintColor: COLORS.gray
																		}} 
																		source={icons.user} 
																	/>
																</View>
																<View style={{
																	width: "100%",
																	height: "54%",
																	alignItems: "center",
																}}>
																	<Text style={{
																		color: COLORS.white,
																		fontSize: SIZES.padding * 1.6, 
																		textAlign: "center",
																		marginBottom: 12
																	}}>
																		{item.nom}  {item.prenom.toUpperCase()}
																	</Text>
																	<View style={{
																		flex: 1,
																		width: "100%", 
																		flexDirection: "row",
																		position: "absolute",
																		bottom: 7
																	}}>
																		<TouchableOpacity 
																			style={
																				[style.btn, {
																						borderColor: COLORS.green,
																						borderWidth: 1
																				}]
																			}
																		onPress={() => navigation.navigate('RequestMoney')}
																		>
																			<Text style={[style.btn_content, {color: COLORS.green}]}>Demander</Text>
																		</TouchableOpacity>

																		<TouchableOpacity 
																			style={[style.btn, {
																				backgroundColor: COLORS.green,
																				marginLeft: 6
																			}]
																		}
																		onPress={() => {
																			setPayee(item.id)
																			setTelephone(item.telephone)
																			setModalVisible(m => ({...m, password: true}))}
																		}
																		>
																			<Text style={[style.btn_content, {color: COLORS.white}]}>Envoyer</Text>
																		</TouchableOpacity>
																	</View>
																</View>
															</View>
														)}
													</View>
												)
											}}
										>
										</FlatList>
									</View>
								</View>

								{/* recent activity */}
								<View style={[style.section, {
										borderRadius: 14, 
										paddingVertical: SIZES.padding * 1.2, 
										paddingHorizontal: SIZES.padding * 2,  
										marginHorizontal: 12,
										backgroundColor: COLORS.hideWhite
									}
								]}>
									<Text style={{color: COLORS.green, fontSize: SIZES.padding * 2, marginBottom: SIZES.padding * 1.2}}>Activité récente</Text>
									<Text style={{
										marginBottom: 10,
										fontSize: SIZES.padding * 1.5,
										color: COLORS.white, 
									}}>
										Voyez quand l'argent entre et quand il sort.
										Vous trouverez votre activeté Ndziwa récente ici.
									</Text>
									<TouchableOpacity onPress={() => navigation.navigate('Historique')}>
										<Text style={{fontSize: SIZES.padding * 1.8, color: COLORS.blue, fontWeight: "bold"}}>Voir plus</Text>
									</TouchableOpacity>
								</View>

								{/* groupe de tontine */}
								<View style={[style.section, {padding: SIZES.padding * 1.2}]}>
									<Text style={[style.title]}>Groupe de tontine</Text>
									<View>
										<FlatList
											keyExtractor={item => (item.id)}
											horizontal
											data={lists}
											showsHorizontalScrollIndicator={false}
											renderItem={(item, index) => {
												return (
													<View>
														<View style={{
															height: 170,
															width: 240,
															marginRight: index === lists.length ? 0 : 10,
															borderRadius: 8
														}}>
															<LinearGradient
																start={{x: 0, y: 0.3}} end={{x: 0, y: 1}}
																colors={[COLORS.hideWhite, COLORS.green]}
																style={{flex: 1, padding: SIZES.padding, borderRadius: 8}}
															>
																<Text style={{
																	color: COLORS.white,
																	fontSize: SIZES.padding * 1.8,
																	textDecorationLine: "underline"
																}}>
																	Nom du groupe
																</Text>

																<View style={style.card}>
																	<View style={style.card_info}>
																		<Text style={style.libele}>Echéance</Text>
																		<Text style={style.value}>22 octobre</Text>
																	</View>

																	<View style={style.card_info}>
																		<Text style={style.libele}>Somme</Text>
																		<Text style={style.value}>12 000 KMF</Text>
																	</View>

																</View>
																<TouchableOpacity
																	style={{
																		position: "absolute",
																		width: 80,
																		height: 45,
																		bottom: 10, 
																		right: 8,
																		backgroundColor: COLORS.blue,
																		justifyContent: "center",
																		alignItems: "center",
																		borderRadius: 13
																	}}
																>
																	<Text style={{color: COLORS.white, fontSize: SIZES.padding * 1.5, fontWeight: "bold"}}>Voir</Text>
																</TouchableOpacity>
															</LinearGradient>
														</View>
													</View>
												)
											}}
										>
										</FlatList>
									</View>
								</View>

								{/* service */}
								<View style={[style.section, {padding: SIZES.padding * 1.4}]}>
									<Text style={[style.title]}>Services</Text>
									
									<View>
										
									</View>
								</View>

							</ScrollView>
						)
					}
				</>
			}
			{/* modal */}
			<ModalSetNin />
			<ModalSetPassword 
				modal={{
					name: "password", 
					modalVisible: modalVisible.password, 
					setModalVisible
				}}

				nextAction={() => navigation.navigate('SentMoney', {
					currentUser: data.data.id,
					payee: payee,
					telephone: telephone
				})}
			/>
			
		</KeyboardAvoidingView>
	)
}

const style = StyleSheet.create({
	text: {
		textAlign: "center",
		color: COLORS.white,
		fontWeight: '500'
	},

	section: {
		marginBottom: SIZES.padding * 1.5,
	},

	btn: {		
		flex: 1,
		height: 45,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5
	},

	btn_content: {
		color: COLORS.black,
		fontSize: SIZES.padding * 1.5,
		fontWeight: "bold"
	},

	title: {
		...FONTS.h1,
		marginBottom: SIZES.padding * 2.4,
		color: COLORS.white
	},

	card: {
		marginTop: SIZES.padding * 2,

	},

	card_info: {
		flexDirection: "row",
		justifyContent: "space-between"
	},

	libele: {
		fontSize: SIZES.padding * 1.5,
		color: COLORS.white
	},

	value: {
		fontSize: SIZES.padding * 1.6,
		color: COLORS.blue,
	}
})

export default Home