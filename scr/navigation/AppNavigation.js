import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from "./DrawerNavigation";
import Details from "../screens/Details";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					presentation: "modal",
					animationTypeForReplace: "push",
					animation: "slide_from_right",
				}}
				initialRouteName="Main"
			>
				<Stack.Screen name="Main" component={DrawerNavigation} />
				<Stack.Screen
					name="Details"
					component={Details}
					options={({ route }) => ({
						title: 'Détails' + ' '+ route.params?.ref,
						headerShown:true
					  })}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;
