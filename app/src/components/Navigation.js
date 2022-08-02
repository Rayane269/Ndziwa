import React, {} from 'react'
import { View, Text } from 'react-native'
import  { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { 
    FirstStep, 
    FourthStep, 
    SecondStep, 
    ThirdStep , 
    SignIn,
    Home,
    SentMoney,
    RequestMoney
} from '../screens'
import Tabs from './Tabs'

const Navigation = () => {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right"
                }}
                initialRouteName={'home'}
            >

                {/* Connexion */}
                <Stack.Screen 
                    name='connexion'
                    component={SignIn}
                    options={{headerShown: false}}
                />

                {/* Inscription */}
                <Stack.Screen 
                    name='inscription_step_1'
                    component={FirstStep}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='inscription_step_2'
                    component={SecondStep}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='inscription_step_3'
                    component={ThirdStep}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='inscription_step_4'
                    component={FourthStep}
                    options={{headerShown: false}}
                />

                {/* Transaction */}
                <Stack.Screen 
                    name='SentMoney'
                    component={SentMoney}
                    options={{
                        animation: "slide_from_bottom"
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

                {/* Tabs */}
                <Stack.Screen 
                    name='home'
                    component={Tabs}
                    options={{
                        animation: "slide_from_right"
                    }}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation