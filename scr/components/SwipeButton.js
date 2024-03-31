import { View, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { SwipeButton } from "react-native-expo-swipe-button";
import { Feather } from "@expo/vector-icons";
import { instance } from "../../config";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import "core-js/stable/atob";
export const LoadSwip = true;
const SwButton = ({ id, reference }) => {
	const navigation = useNavigation();
	const { userToken } = useContext(AuthContext);
	const { user_id } = jwtDecode(userToken, { playload: true });
	const [swip, setSwip] = useState(false);
	const handleAcceptJob = async () => {
		await instance.post(`job`, { order: id, user: user_id }).then(() => {
			setSwip(true);
			navigation.navigate("Job_Details", {ref:reference, id:id});
		});
	};

	return (
		<View style={styles.container}>
			<SwipeButton
				Icon={<Feather name="arrow-right" size={50} color="white" />}
				onComplete={() => handleAcceptJob()}
				title="Faire glisser pour accepter"
				borderRadius={13}
				iconContainerStyle={{ backgroundColor: COLORS.red }}
				completeThresholdPercentage={95}
				goBackToStart={swip ? true : false}
				underlayContainerGradientProps={{
					colors: [COLORS.red, COLORS.blue_light],
					start: [0, 0.5],
					end: [1, 0.5],
				}}
				containerStyle={{
					backgroundColor: COLORS.blue,
					borderRadius: 13,
				}}
				titleStyle={{
					fontSize: 15,
					fontWeight: "500",
					color: COLORS.white,
				}}
				titleContainerStyle={{
					flexDirection: "row",
				}}
				underlayTitle="Allez-y!"
				underlayTitleStyle={{
					color: COLORS.white,
					fontSize: 15,
					fontWeight: "500",
					color: COLORS.white,
				}}
				underlayStyle={{
					borderRadius: 13,
					backgroundColor: "rgba(0, 0, 0, 0.6)",
				}}
				underlayTitleContainerStyle={{
					backgroundColor: "rgba(0, 0, 0, 0.6)",
					borderRadius: 13,
				}}
			/>
		</View>
	);
};

export default SwButton;
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "center",
		left: 0,
		right: 0,
		top: 120,
	},
});
