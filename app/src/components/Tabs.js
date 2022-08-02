import React, {useEffect} from "react"
import { View, Image, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home, Tontine, History, Settings  } from "../screens"
import { COLORS, icons, images, SIZES } from "../../constants"
import { isAuthenticated } from "../functions/auth"
import Spinner from "react-native-loading-spinner-overlay"
const Tab = createBottomTabNavigator()

const Tabs = ({navigation}) => {

	const { data, authenticated, loadingIsAuthenticate, is } = isAuthenticated()

    useEffect(() => {
		if (!authenticated) {
			console.log(authenticated, 'effect')
			is()
			.then(connected => (!connected && navigation.navigate('connexion') ))
		}
	}, [authenticated])

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
                        justifyContent: "center"
                    }
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.box}>
                                <Image 
                                    source={icons.home}
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
                                ]}>Home</Text>
                            </View>
                        )
                    }}
                >
                </Tab.Screen>
                <Tab.Screen
                    name="Tontine"
                    component={Tontine}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.box}>
                                <Image 
                                    source={icons.wallet}
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
                                ]}>Tontine</Text>
                            </View>
                        )
                    }}
                >
                </Tab.Screen>
                
                <Tab.Screen
                    name="Transaction"
                    component={Tontine}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                alignItems: "center", 
                                justifyContent: "center",
                                position: "absolute",
                                top: "-40%",
                                backgroundColor: focused ? COLORS.green : COLORS.black,
                                width: 50,
                                height: 50,
                                borderRadius: SIZES.radius,
                                padding: SIZES.padding * 2
    
    
                            }}>
                                <Image 
                                    source={icons.transaction}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? COLORS.white : COLORS.white,
                                    }}
                                />
                                {/*<Text style={{
                                    color: focused ? COLORS.green : COLORS.black
                                }}>Transaction</Text> */}
                            </View>
                        )
                    }}
                >
                </Tab.Screen>
    
                <Tab.Screen
                    name="Historique"
                    component={History}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.box}>
                                <Image 
                                    source={icons.chart}
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
                                ]}>Historique</Text>
                            </View>
                        )
                    }}
                >
                </Tab.Screen>
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.box}>
                                <Image 
                                    source={icons.settings}
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
                                ]}>Settings</Text>
                            </View>
                        )
                    }}
                >
                </Tab.Screen>
    
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

    label: {
        fontSize: SIZES.padding * 1.2
    }
})

export default Tabs