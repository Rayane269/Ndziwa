import React, {} from 'react'
import  { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { 
    FirstStep, 
    FourthStep, 
    SecondStep, 
    ThirdStep , 
    SignIn,
    SentMoney,
    RequestMoney,
    AboutTontineInProgress,
    AboutTontineWaiting,
    SendInvitation,
    DefineObjectif
} from '../screens'
import Tabs from './Tabs'
import { createStore, applyMiddleware } from "redux"
import { Provider } from 'react-redux'
import thunk from "redux-thunk"
import rootReducer from '../stores'
import UserListForSendOrRequestMoney from '../screens/transactions/UserListForSendOrRequestMoney'
import { 
    NavigationContactCustom, 
    RenderDefineObjectifHeader, 
    RenderHeaderTontine, 
    RenderHeaderTransaction 
} from './Utils'
import { COLORS } from '../../constants'

const Stack = createNativeStackNavigator()
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

const Navigation = () => {

    return (
        <Provider store={store} >
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: true,
                        statusBarColor: COLORS.green,
                        animation: "slide_from_right"
                    }}
                    initialRouteName={'MainLayout'}
                >

                    {/* Connexion */}
                    <Stack.Screen 
                        name='connexion'
                        component={SignIn}
                        options={{
                            headerShown: false
                        }}
                    />

                    {/* Inscription */}
                    <Stack.Screen 
                        name='inscription_step_1'
                        component={FirstStep}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen 
                        name='inscription_step_2'
                        component={SecondStep}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen 
                        name='inscription_step_3'
                        component={ThirdStep}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen 
                        name='inscription_step_4'
                        component={FourthStep}
                        options={{
                            headerShown: false
                        }}
                    />

                    {/* Transaction */}
                    <Stack.Screen 
                        name='UserList'
                        component={UserListForSendOrRequestMoney}
                        options={{
                            headerShown: true,
                            animation: "slide_from_bottom",
                        }}
                    />
                    <Stack.Screen 
                        name='SentMoney'
                        component={SentMoney}
                        options={{
                            headerShown: true,
                            header: ({navigation}) => (
                                <RenderHeaderTransaction 
                                    navigation={navigation} 
                                    containerStyle={{
                                        backgroundColor: COLORS.green
                                    }}    
                                />
                            ),
                            animation: "slide_from_bottom",
                        }}
                    />
                    <Stack.Screen 
                        name='RequestMoney'
                        component={RequestMoney}
                        options={{
                            headerShown: true,
                            animation: "slide_from_bottom"
                        }}
                    />

                    {/* Tontines */}
                    <Stack.Screen 
                        name='TontineInProgress'
                        component={AboutTontineInProgress}
                        options={{
                            headerShown: true,
                            animation: "slide_from_bottom"
                        }}
                    />

                    <Stack.Screen 
                        name='TontineWaiting'
                        component={AboutTontineWaiting}
                        options={{
                            headerShown: false,
                            statusBarColor: COLORS.green,
                            header: ({navigation}) => (
                                <RenderHeaderTontine 
                                    navigation={navigation} 
                                    text="Ordre de collecte"
                                    containerStyle={{backgroundColor: COLORS.green}}
                                />
                            ),
                            animation: "slide_from_bottom"
                        }}
                    />

                    <Stack.Screen 
                        name='SendInvitation'
                        component={SendInvitation}
                        options={{
                            headerShown: true,
                            statusBarColor: COLORS.green,
                            header: ({navigation}) => (
                                <NavigationContactCustom 
                                    navigation={navigation}  
                                    containerStyle={{backgroundColor: COLORS.green}}
                                />
                            ),
                            animation: "slide_from_bottom"
                        }}
                    />

                    <Stack.Screen 
                        name='DefineObjectif'
                        component={DefineObjectif}
                        options={{
                            headerShown: true,
                            statusBarColor: COLORS.green,
                            header: ({navigation}) => (
                                <RenderDefineObjectifHeader
                                    navigation={navigation}  
                                    containerStyle={{backgroundColor: COLORS.green}}
                                />
                            ),
                            animation: "slide_from_bottom"
                        }}
                    />

                    {/* Tabs */}
                    <Stack.Screen 

                        name='MainLayout'
                        component={Tabs}
                        options={{
                            headerShown: false,
                            animation: "slide_from_right"
                        }}
                    />
                    
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default Navigation