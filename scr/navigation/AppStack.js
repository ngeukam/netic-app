import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import { Details, Details_2, EditPublication, EditProfile } from "../screens";

const Stack = createNativeStackNavigator();

const AppStack = () => {
	return (
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
						title: "Détails" + " " + route.params?.ref,
						headerShown: true,
					})}
				/>
				<Stack.Screen
					name="Job_Details"
					component={Details_2}
					options={({ route }) => ({
						title: "Détails" + " " + route.params?.ref,
						headerShown: true,
					})}
				/>
				<Stack.Screen
					name="Edit_Publication"
					component={EditPublication}
					options={({ route }) => ({
						title: "Modification" + " " + route.params?.ref,
						headerShown: true,
					})}
				/>
				<Stack.Screen
					name="Edit_Profile"
					component={EditProfile}
					options={({ route }) => ({
						title: "Modification" + " " + route.params?.name,
						headerShown: true,
					})}
				/>
			</Stack.Navigator>
	);
};

export default AppStack;
