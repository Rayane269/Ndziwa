import { DefaultTheme } from '@react-navigation/native'
import React, {} from 'react'
import { View, Text } from 'react-native'
import Navigation from './src/components/Navigation'

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		border: "transparent"
	}
}

const App = () => {
	
	return (
		<Navigation />
	)
}

export default App