import React, { useCallback, useEffect, useState } from "react"
import { View, 
	Text, 
	Image, 
	StyleSheet, 
	ScrollView, 
	ImageBackground, 
	TouchableOpacity, 
	FlatList, 
	ActivityIndicator, 
} from "react-native"
import { activateMyAccount } from "../functions/auth"
import { COLORS, FONTS, icons, images, SIZES } from "../../constants"
import { ButtonSubmit, TextField } from "../components/Field"
import { ModalSetPassword, ModalWithDataEntry } from "../components/Modals"
import MainLayout from "./MainLayout"
import { connect } from "react-redux"
import { getCurrentUserAction } from "../stores/actions"
import { currentUserSelector } from "../stores/selectors"
import { substrReplace } from "../functions/utils"

const Home = ({userData, getCurrentUser, navigation}) => {

	const { user, loading: loadingUser, errors: authenticated} = userData
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
		getCurrentUser()
	}, [])

	//handler

	/**
	 * 
	 * @param {string} value
	 * @return {void}
	 */
	const handleSubmitNin = useCallback(async (value) => {

		const response = await activate({'nin': value})
		
		if (response !== undefined) {
			getCurrentUser()
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

		return (
			<View style={{backgroundColor: COLORS.green, marginBottom: SIZES.padding}}>
				<View style={{
					height: SIZES.height / 4,
				}}>
					<View style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "flex-end",
					}}>
						<ImageBackground 
							source={images.banner}
							resizeMode="stretch"
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: "85%",
								height: "100%"
							}}
						>
							<View 
								style={{
									justifyContent: "center",
									alignItems: 'flex-start',
									marginBottom: SIZES.padding * 2,
								}}
							>
								<Text style={{
									color: COLORS.white, 
									...FONTS.h4,
									textAlign: "center",
									fontWeight: "bold",
									marginTop: SIZES.padding * 2,
									
								}}>
									{`${user.account.bourse} ${user.region.devise}`}
								</Text>
							</View>
						</ImageBackground>
					</View>

				</View>
			</View>
		)
	}, [modalVisible.nin])

	return (
		<MainLayout
			behavior={Platform.OS === "ios" ? "padding" : null}
			containerStyle={{ flex: 1, marginBottom: 30, backgroundColor: COLORS.black}}
		>
			{loadingUser &&
				<ActivityIndicator style={{marginTop: SIZES.padding * 2}} size={30} color={COLORS.green} />
			}
			{Object.entries(user).length > 0 && !loadingUser &&
				<>
					{ user.nin == null 
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
								<RenderHeader user={user}/>

								{/* sent and request money */}
								<View style={[style.section, {
									paddingVertical: SIZES.padding,
								}]}>
									<Text style={[
										style.title, 
										{
											paddingHorizontal: SIZES.padding * 1.2
										}
									]}>
										Transferez de l'argent
									</Text>
									<FlatList
										keyExtractor={item => (item.id)}
										horizontal
										showsHorizontalScrollIndicator={false}
										data={lists}
										renderItem={({item, index}) => {
											return (
												<View style={{
													marginRight: 5,
													justifyContent: "center"
												}}>
													{index === lists.length - 1
													? (
														<View style={{
															width: 65,
															justifyContent: "center",
															alignItems: "center",
														}}>
															<TouchableOpacity 
																style={{
																	width: 55,
																	height: 55,
																	justifyContent: "center",
																	alignItems: "center",
																	borderRadius: SIZES.radius,	
																	backgroundColor: COLORS.green
																}}
																onPress={() => navigation.navigate("UserList")}
															>
																<Image resizeMode="contain" style={{width: 30, tintColor: COLORS.white}} source={icons.all} />
															</TouchableOpacity>
														</View>

													) 
													: (
														<TouchableOpacity 
															style={{
																width: 90,
																justifyContent: "center",
																alignItems: "center"
															}}
															onPress={() => setModalVisible(m => ({...m, password: true}))}
														>
															<View 
																style={{
																	width: 60,
																	height: 60,
																	borderRadius: 999,
																	justifyContent: "flex-end",
																	alignItems: "center",
																	backgroundColor: COLORS.white,
																}}
															>
																<Image 
																	resizeMode="contain" 
																	style={{
																		width: "80%", 
																		height: "80%", 
																		tintColor: COLORS.gray
																	}} 
																	source={icons.user} 
																/>
															</View>
															<Text style={{
																color: COLORS.white,
																fontSize: 14, 
																textAlign: "center",
															}}>
																{substrReplace(item.nom, '...', 8)}
															</Text>
															<Text 
																style={{
																	color: COLORS.white,
																	fontSize: 14, 
																	textAlign: "center",
																}}
															>
																{substrReplace(item.prenom, '...', 8)}
															</Text>
														</TouchableOpacity>
													)}
												</View>
											)
										}}
									/>									
								</View>

								{/* recent activity */}
								<View style={[style.section, {
										borderRadius: 14, 
										paddingVertical: SIZES.padding * 1.2, 
										paddingHorizontal: SIZES.padding * 2,  
										marginHorizontal: 12,
										backgroundColor: COLORS.hideWhite,
										shadowColor: "#000",
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
									{/*<View>
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
									*/}
								</View>

								{/* service */}
								<View style={[style.section, {padding: SIZES.padding * 1.4}]}>
									<Text style={[style.title]}>Services</Text>
									
									<View style={{}}>
										<Text>Salut</Text>
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
					currentUser: user.id,
					payee: payee,
					telephone: telephone
				})}
			/>
			
		</MainLayout>
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
		...FONTS.h2,
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

export default connect(
	state => ({
		userData: currentUserSelector(state)
	}),
	dispatch => ({
		getCurrentUser: () => dispatch(getCurrentUserAction())
	})
)(Home)