import React, { useState } from "react"
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import { COLORS, icons, SIZES } from "../../../../constants"
import MainLayout from "../../MainLayout"
import { connect } from "react-redux"
import { currentUserSelector, registredContact } from "../../../stores/selectors"
import { useEffect } from "react"
import { getCurrentUserAction, getRegistredContactsAction } from "../../../stores/actions"
import { useJsonFetch } from "../../../functions/hooks"
import { BASE_URL } from "../../../config"


/**
 * Afficher une item
 *  
 * @param {{roles, item, stateContact: {contacts, setContacts}, group}} param0 
 * @returns 
 */
const RenderItemContact = ({roles, item, stateContact, group}) => {
	const {contacts, setContacts} = stateContact
	const {loading: loadingInvitation, errors: errorsInvitation, fetch: sendOrRemoveInvitation} = useJsonFetch()
	console.log(errorsInvitation, "erreur invitation")
	const handleSendOrDeleteInvitation = (item) => {
		console.log(item, 'invitation')
		setContacts(s => contacts.map(contact => {
			if (contact.id === item.id) {
				if (contact.guest) {
					console.log("salut salut", item)
					//suppression d'un membre
					sendOrRemoveInvitation(
						`${BASE_URL}/api/tontine/remove-member/${group}`,
						{
							method: "POST",
							body: {user: item.id}
						}
					)
						
				} else {
					//ajout d'un membre
					sendOrRemoveInvitation(
						`${BASE_URL}/api/tontine/create/second-step/${group}`,
						{
							method: "POST",
							body: {members: [{id: item.id}]}
						}
					)
				}

				return { ...contact, guest: !contact.guest }
			} else {
				return contact
			}
		}))
	}

	return (
		<View style={{
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 25,
			paddingHorizontal: SIZES.padding,
		}}>
			<View 
				style={{
					flexDirection: "row",
					alignItems: "center",
					flexGrow: 1
				}}
			>
				<View style={{
					backgroundColor: COLORS.gray,
					borderRadius: 9999,
					width: 45,
					height: 45,
					alignItems: "center",
					justifyContent: "flex-end"
						
				}}>
					<Image 
						source={icons.user}
						resizeMode="center"
						style={{
							width: 40,
							height: 40,
							tintColor: COLORS.white
						}}  
					/>
				</View>
				<View style={{marginLeft: 20}}>
					<Text style={{
						fontSize: 13,
						color: COLORS.white,
					}}>
						{item.nameOfContact || item.fullName}
					</Text>
					<Text style={{
						fontSize: 12,
						color: COLORS.gray,
					}}>
						{item.telephone}
					</Text>
				</View>
			</View>
			<TouchableOpacity 
				style={{
					backgroundColor: item.guest === true ? COLORS.red : COLORS.green,
					padding: 10,
					borderRadius: 6,
					width: 90,
					justifyContent: "center",
					alignItems: "center"
				}}
				onPress={() => handleSendOrDeleteInvitation(item)}
			>
				{loadingInvitation 
					?
						<ActivityIndicator color={COLORS.white} />
					:
						<Text style={{
							color: COLORS.white,
							fontSize: 14
						}}>
							{ item.guest === true ? "Supprimer" : "Inviter" }
						</Text>
				}
			</TouchableOpacity>
		</View>
	)
}

/**
 * Inviter les contacts
 * 
 * @param {{registredContacts, getRegistredContacts, navigation, route}} param0 
 * @returns 
 */
const SendInvitation = ({
	registredContacts, 
	getRegistredContacts, 
	currentUser,
	getCurentUser,
	navigation, 
	route
}) => {
  	const { registredContacts: registred, loading, errors: errorsRegistred  } = registredContacts
	const { user } = currentUser
	const {group} = route.params
	const [contacts, setContacts] = useState([])

	useEffect(() => {
		getRegistredContacts()
		getCurentUser()
	}, [])

	useEffect(() => {
		setContacts(
			registred.map(contact => ({
				...contact, 
				guest: contact.roles.indexOf(`ROLE_MEMBER_GROUP_${group}`) !== -1 ? true : false 
			}))
		)
	}, [registred])

	console.log(registred, "contacts")	

	return (
		<MainLayout
			behavior={Platform.OS === "ios" ? "padding" : null}
			containerStyle={{ flex: 1, backgroundColor: COLORS.black }}
		>
			{loading ? 
				<ActivityIndicator />
			:
				<FlatList
						style={{
							paddingVertical: 20
						}}
						data={contacts}
						keyExtractor={item => item.id}
						renderItem={({item, index}) => (
							<RenderItemContact roles={JSON.parse(user.roles)} group={group} stateContact={{contacts, setContacts}} item={item} />
						)}
				/>
			}
			<View style={{
				backgroundColor: COLORS.black,
				justifyContent: "center",
				alignItems: "center",
				paddingVertical: 8
			}}>
				<TouchableOpacity 
					style={{
						backgroundColor: COLORS.green,
						paddingHorizontal: 20,
						paddingVertical: 10,
						borderRadius: 8
					}}
					onPress={() => navigation.navigate('TontineWaiting', {
						group: group
					})}
				>
					<Text style={{
						fontSize: 16,
						color: COLORS.white
					}}>Voir</Text>
				</TouchableOpacity>						
			</View>
		</MainLayout>
	)
}

export default connect(
	state => ({
		registredContacts: registredContact(state),
		currentUser: currentUserSelector(state)
	}),
	dispatch => ({
		getRegistredContacts: () => dispatch(getRegistredContactsAction()),
		getCurentUser: () => dispatch(getCurrentUserAction())
	})
)(SendInvitation)