import { View, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const ButtonCreatePublication = () => {
	return (
		<Pressable onPress={() => {}}>
			<View style={styles.btn}>
				<View style={{ width: 32 }} />
				<Text style={styles.btnText}>Publier</Text>
			</View>
		</Pressable>
	);
};

export default ButtonCreatePublication;
const styles = StyleSheet.create({
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderWidth: 1,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
	},
	btnText: {
		fontSize: 17,
		lineHeight: 24,
		fontWeight: "600",
		color: COLORS.white,
		textAlign: "center",
	},
});
