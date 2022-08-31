import React, { useEffect } from "react"
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native"
import { connect } from "react-redux"
import { COLORS, SIZES, FONTS, icons } from "../../../constants"
import { RenderHeaderTontine } from "../../components/Utils"
import { getCurrentUserAction } from "../../stores/actions"
import { currentUserSelector } from "../../stores/selectors"
import MainLayout from "../MainLayout"



const AboutTontineWaiting = ({user, getCurentUser, navigation, route}) => {

	const participans = [
		{id: 1, fullName: "Azad YM", telephone: "3255924", accepted: true},
		{id: 2, fullName: "Raissa Oumary", telephone: "3424567", accepted: false},
		{id: 3, fullName: "Badrou Ahamada", telephone: "4342345", accepted: true},
		{id: 4, fullName: "Yousfi Mzé", telephone: "3254435", accepted: false},
		{id: 5, fullName: "Azhar Moissuli", telephone: "3479071", accepted: true},
	]

	const {group} = route.params
	const {user: currentUser} = user
	
	useEffect(() => {
		getCurentUser()
	}, [])
	
	const ListParticipans = ({lists}) => {

		return (
			<FlatList
				data={lists}
				keyExtractor={item => item.id}
				renderItem={({item, index}) => {
					return (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginHorizontal: 20,
								marginTop: index === 0 ? 15 : 10,
								marginBottom: index === lists.length - 1 ? 15 : 0
							}}
						>
							<Text style={{
								width: 23,
								height: 23,
								paddingTop: 1,
								textAlign: "center",
								borderRadius: 999,
								backgroundColor: COLORS.blue,
								color: COLORS.white,
								marginRight: 12
							}}>{index + 1}</Text>
							<View
								style={{
									shadowColor: "#000",
									shadowOffset: {width: 0, height: 1},
									shadowOpacity: 0.8,
									shadowRadius: 2,
									flexDirection: "row",
									alignItems: "center",
									height: 52,
									width: "85%",
									backgroundColor: COLORS.hideBlack,
									padding: 5,
									borderRadius: 8
								}}
							>
								<View
									style={{
										backgroundColor: COLORS.gray,
										justifyContent: "flex-end",
										alignItems: "center",
										width: 33,
										height: 33,
										borderRadius: 999,
										marginRight: 10
									}}
								>
									<Image 
										source={icons.user}
										style={{
											tintColor: COLORS.white,
											width: "80%",
											height: "80%"
										}}
									/>
								</View>
								<View>
									<Text style={{color: COLORS.black}}>
										{item.fullName}
									</Text>
									<Text style={{color: COLORS.gray}}>
										{item.telephone}
									</Text>
								</View>
							</View>
						</View>
					)
				}}
			/>
		)
	}

	return (
		<MainLayout
			behavior={Platform.OS === "ios" ? "padding" : null}
			containerStyle={{ flex: 1, backgroundColor: COLORS.black}}
		>
			<RenderHeaderTontine 
				navigation={navigation} 
				text="Ordre de collecte"
				containerStyle={{backgroundColor: COLORS.green}}
				group={group}
				currentUser={currentUser}
			/>
			<View style={{paddingHorizontal: 15, marginTop: 14}}>
				<Text style={{color: COLORS.blue, ...FONTS.h3}}>Définis l'ordre de collecte</Text>
				<Text style={{fontSize: 13, marginVertical: 5, color: COLORS.white, lineHeight: 15}}>
					Pour changer l'ordre de collecte, maintiens ton doigt pressé sur le participant et fais le glisser à la bonne position.
				</Text>
			</View>

			<View
				style={{
					backgroundColor: COLORS.white,
					height: SIZES.height - 215,
					borderRadius: SIZES.radius,
					marginTop: 8
				}}
			>
				
				<ListParticipans lists={participans} />
				<TouchableOpacity
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						paddingVertical: 12,
						backgroundColor: COLORS.green,
						borderBottomLeftRadius: SIZES.radius,
						borderBottomRightRadius: SIZES.radius,

					}}
				>
					<Text style={{color: COLORS.white, fontSize: 14, fontWeight: "800"}}>Commencer</Text>
				</TouchableOpacity>
			</View>
		</MainLayout>
	)
}

export default connect(
	state => ({
		user: currentUserSelector(state)
	}),
	dispatch => ({
		getCurentUser: () => dispatch(getCurrentUserAction())
	})
)(AboutTontineWaiting)