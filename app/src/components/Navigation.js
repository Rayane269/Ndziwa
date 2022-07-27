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
    Home
} from '../screens'
import Tabs from './Tabs'

const Navigation = () => {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'connexion'}
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

                {/* Tabs */}
                <Stack.Screen 
                    name='home'
                    component={Tabs}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation