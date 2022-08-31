import React, {useEffect} from "react"
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home, History, Settings, ShowTontines  } from "../screens"
import { COLORS, icons, SIZES } from "../../constants"
import { isAuthenticated } from "../functions/auth"
import Spinner from "react-native-loading-spinner-overlay"
import { connect } from "react-redux"
import { setTransactionModalVisibility } from "../stores/actions"
import { transactionModalSelector } from "../stores/selectors"
import { RenderHomeHeader } from "./Utils"

const Tab = createBottomTabNavigator()

/**
 * @param {{focused: boolean, isTrade: boolean, icon, label: string, containerStyle: Object}}
 */
const TabBarField = ({focused, isTrade, icon, label, containerStyle}) => {
    
	return (
		<>
		{isTrade ? 
			<View style={[
				styles.trade, 
				{
					backgroundColor: COLORS.green,
				}
			]}>
				<Image 
					source={icon}
					resizeMode="contain"
					style={{
						width: focused ? 15 : 25,
						height: focused ? 15 : 25,
						tintColor: COLORS.white,
					}}
				/>
			</View>
		:
			<View style={styles.box}>
				<Image 
					source={icon}
					resizeMode="contain"
					style={{
						width: 20,
						height: 20,
						tintColor: focused ? COLORS.green : COLORS.black,
					}}
				/>
				<Text style={[
					styles.label,
					{
						color: focused ? COLORS.green : COLORS.black
					}
				]}>{label}</Text>
			</View>

		}
		</>
	)
}

const TabBarCustomButtom = ({children, onPress}) => {
	return <TouchableOpacity 
		style={{
			flex: 1,
			justifyContent: "center",
			alignItems: "center"
		}}
		onPress={onPress}
	>
		{children}
	</TouchableOpacity>
}

const Tabs = ({transactionModalVisible, setTransactionModalVisibility,  navigation}) => {

	const { data, authenticated, loadingIsAuthenticate, is } = isAuthenticated()

  	useEffect(() => {
		if (!authenticated) {
			is()
			.then(connected => (!connected && navigation.navigate('connexion') ))
		}
	}, [authenticated])


	const transactionTabButtonOnClickHandler = () => {
		setTransactionModalVisibility(!transactionModalVisible)
	}

	return (
		<>
		{loadingIsAuthenticate && !authenticated &&
			<Spinner visible={true} />
		}
		{authenticated && !loadingIsAuthenticate &&
			<Tab.Navigator 
				screenOptions= {{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: {
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						elevation: 0,
						backgroundColor: COLORS.white,
						height: 60,
						justifyContent: "center",
					}
				}}
			>
				<Tab.Screen
					name="Home"
					component={Home}
					options={{
						headerShown: true,
						header: (() => (
							<RenderHomeHeader 
								containerStyle={{backgroundColor: COLORS.green}}  
								navigation={navigation}
							/>
						)),
						tabBarIcon: ({ focused }) => {
							if (!transactionModalVisible) {
								return <TabBarField 
									focused={focused} 
									icon={icons.home}
									label="Home"
								/>
							}
						}
					}}
					listeners={{
						tabPress: e => {
							if (transactionModalVisible) {
								e.preventDefault()
							}
						} 
					}}
				/>
				
				<Tab.Screen
					name="Tontine"
					component={ShowTontines}
					options={{
						headerShown: true,
						header: (() => (
							<RenderHomeHeader 
								containerStyle={{backgroundColor: COLORS.green}}  
								navigation={navigation}
							/>
						)),
						tabBarIcon: ({ focused }) => {
							if (!transactionModalVisible) {
								return <TabBarField 
									focused={focused} 
									icon={icons.wallet}
									label="Mtsango"
								/>
							}
						}
					}}
					listeners={{
						tabPress: e => {
							if (transactionModalVisible) {
								e.preventDefault()
							}
						} 
					}}
				/>
				
				<Tab.Screen
					name="Transaction"
					component={Home}
					options={{
						tabBarIcon: ({ focused }) => (
							<TabBarField 
								focused={focused}
								isTrade={true}
								icon={ transactionModalVisible ? icons.close : icons.transaction}
							/>
						),
						tabBarButton: (props) => (
							<TabBarCustomButtom 
								{...props}
								onPress={() => transactionTabButtonOnClickHandler()} 
							/>
						)
					}}
				/>

				<Tab.Screen
					name="Historique"
					component={History}
					options={{
						headerShown: true,
						header: (() => (
							<RenderHomeHeader 
								containerStyle={{backgroundColor: COLORS.green}}  
								navigation={navigation}
							/>
						)),
						tabBarIcon: ({ focused }) => {
							if (!transactionModalVisible) {
								return (
									<TabBarField 
										focused={focused} 
										icon={icons.chart}
										label="Historique"
									/>
								)
							}
						}
					}}
					listeners={{
						tabPress: e => {
							if (transactionModalVisible) {
								e.preventDefault()
							}
						} 
					}}
				/>

				<Tab.Screen
					name="Settings"
					component={Settings}
					options={{
						tabBarIcon: ({ focused }) => {
							if (!transactionModalVisible) {
								return (
									<TabBarField 
										focused={focused} 
										icon={icons.settings}
										label="Settings"
									/>
								)
							}
						}
					}}
					listeners={{
						tabPress: e => {
							if (transactionModalVisible) {
								e.preventDefault()
							}
						} 
					}}
				/>
			</Tab.Navigator>
		}
		</>
	)
}

const styles = StyleSheet.create({
	box: {
		minWidth: 80,
		alignItems: "center",
		justifyContent: "center",
	},

	trade: {
		alignItems: "center", 
		justifyContent: "center",
		position: "absolute",
		top: "-40%",
		width: 50,
		height: 50,
		borderRadius: SIZES.radius,
		padding: SIZES.padding * 2
	},

	label: {
		fontSize: SIZES.padding * 1.2
	}
})

export default connect(
	state => ({
		transactionModalVisible: transactionModalSelector(state)
	}),
	dispatch => ({
		setTransactionModalVisibility: isVisible => dispatch(setTransactionModalVisibility(isVisible))
	})
)(Tabs)