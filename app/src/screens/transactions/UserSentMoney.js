import React, { useEffect, useState, useCallback } from "react"
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Image, ActivityIndicator, FlatList } from "react-native"
import { COLORS, FONTS, icons, images, SIZES } from "../../../constants"
import { LastLink } from "../../components/Utils"
import { TransactionModal } from "../../components/Modals"
import { ModalSetSmsCode, ModalShowInfo } from "../../components/Modals/Modals"
import { getOperationWithAnotherPerson, setTransfertMoney } from "../../functions/auth"
import moment from "moment"

const SentMoney = ({navigation, route}) => {
  moment.locale('fr')
	const { data: operations, errors, loading, getOperations } = getOperationWithAnotherPerson(route.params.payee)
	const { sending, errorsTransfer, send } = setTransfertMoney()
	const [value, setValue] = useState({
		somme: null,
		libelle: null
	})
	const [modal, setModal] = useState({
		somme: true,
		libelle: false,
		info: false,
		smsVerification: false,
		errors: false
	})
	
	useEffect(() => {
		getOperations()
	}, [])

	useEffect(() => {
		if (errorsTransfer.message !== undefined) {
			setModal(m => ({...m, errors: true, somme: true, libelle: false}))
		}
	}, [errorsTransfer])

	const calendar = {
		fromNow: '[h]',
    sameDay: '[Aujourd\'hui à] H:m',
    lastDay: '[Hier à ] H:m',
    sameElse: 'DD/MMM/YYYY à H:m' 
	};

	console.log(errorsTransfer.message, modal.errors, "error")

	const handleTransfertMoney = async () => {
		
		const response = await send({
			telephone: route.params.telephone,
			libelle: value.libelle,
			somme: value.somme
		})
		console.log(response, "transfert")
		if (response !== undefined) {
			console.log('get Operation')
			getOperations()
			setModal(m => ({...m, info: true, somme: true}))
		}
		
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : null}
			style={{ flex: 1}}
		>
			
			<View style={styles.container}>
				
				<View style={styles.content}>
					{loading &&
						<ActivityIndicator size={25} />
					}
					{!loading && operations.data !== undefined &&
						<FlatList 
							keyExtractor={item => item.id}
							data={operations.data}
							style={{marginBottom: 50}}
							renderItem={({item, index}) => {
								return (
									<View 
										style={[styles.message, 
											{
												alignItems: route.params.currentUser === item.compte_id  
												? "flex-end"
												: "flex-start",
												marginTop: index === 0 ? 5 : 0
											}
										]}
										key={item.id}
									>
										
										<View style={[
											route.params.currentUser === item.compte_id 
											? styles.me
											: styles.other,
										]}>
											<Text style={styles.text}>
												{
													route.params.currentUser === item.compte_id ?  item.libelle : (
														route.params.payee === item.beneficiaire ? "A reçu une somme de " + item.somme :
														"Vous a envoyé une somme de " + item.somme 
													)
												}
											</Text>
											<Text style={{
												color: COLORS.white,
												textAlign: "right",
												marginTop: 8
											}}>
												{moment(item.created_at).calendar(null, calendar)}
											</Text>
										</View>
									</View>
								)
							}}
						/>
					}
				</View>
				
				<TransactionModal  
						modal={{
							visible: modal.somme, 
							next: (value) => {
								setValue(v => ({...v, somme: value }))
								setModal(m => ({...m, somme: false, libelle: true}))
							}
						}}
						name="somme"
						keyboardType="numeric"
						label="Somme à transférer"
						maxLength={10}
				/>

				<TransactionModal  
						modal={{
							visible: modal.libelle, 
							prev: () => setModal(m => ({...m, libelle: false, somme: true})),
							next: (value) => {
								setValue(v => ({...v, libelle: value}))
								setModal(m => ({...m, libelle: false, smsVerification: true}))
							}
						}}
						name="libelle"
						step={2}
						keyboardType="default"
						multiline={true}
						label="Message"
				/>
				
				<ModalShowInfo 
						modal={{
								visible: modal.info,
								onClose: () => setModal(m => ({...m, info: false, somme: true, libelle: false}))
						}} 
				>
						<Image 
								resizeMode="contain"
								source={icons.info}
								style={{
										width: "50%",
										height: "50%",
										tintColor: COLORS.green
								}}
						/>
						<Text style={{fontSize: SIZES.padding * 2, color: COLORS.black}}>Opération réussit</Text>
				</ModalShowInfo>

				<ModalShowInfo
					modal={{
						visible: modal.errors,
						onClose: () => setModal(m => ({...m, errors: false}))
					}} 
				>
					<Image 
						resizeMode="contain"
						source={icons.info}
						style={{
							width: "50%",
							height: "50%",
							tintColor: COLORS.red
						}}
					/>
					<Text style={{fontSize: SIZES.padding * 2, color: COLORS.red}}>{errorsTransfer.message}</Text>
				</ModalShowInfo>

				<ModalSetSmsCode 
					modal={{
						name: "smsVerification", 
						modalVisible: modal.smsVerification, 
						setModalVisible: setModal
					}} 
					nextAction={() => handleTransfertMoney()}
				/>

			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
    container: {
			backgroundColor: COLORS.black,
			flex: 1,
			position: "relative"
    },

    content: {
			marginBottom: SIZES.padding * 6,
			width: "100%",
			height: "100%",
			backgroundColor: COLORS.transparent,
    },
    message: {
			width: "100%",
			paddingHorizontal: 6,
			marginBottom: 8,
    },
    me: {
			backgroundColor: COLORS.primary,
			alignItems: "flex-end",
			maxWidth: "90%",
			padding: 8,
			borderRadius: 12,
    },
    other: {
			backgroundColor: COLORS.secondary,
			maxWidth: "90%",
			padding: 8,
			borderRadius: 12

    },
    text: {
			color: COLORS.white,
			fontSize: 16,
    }
})


export default SentMoney