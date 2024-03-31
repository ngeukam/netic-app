import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React, { useState } from "react";
import SelectDlvField from "../components/SelectDlvField";
import SelectPickupField from "../components/SelectPickupField";
import { COLORS } from "../constants";
import Header2 from "../components/Header2";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
	const navigation = useNavigation();
	const [arrival, setArrival] = useState();
	const [depart, setDepart] = useState();
	return (
		<SafeAreaView style={[styles.container]}>
			<Header2 title="Voir les demandes de transports en fonction des villes !" />
			<View style={[styles.form]}>
				<View style={{ flexDirection: "row" }}>
					<View style={[styles.input, { flex: 1 }]}>
						<SelectPickupField setValue={setDepart} value={depart}/>
					</View>
				</View>
				<View style={{ flexDirection: "row", marginVertical: 20 }}>
					<View style={[styles.input, { flex: 1 }]}>
						<SelectDlvField setValue={setArrival} value={arrival}/>
					</View>
				</View>

				<Pressable
					onPress={() => {
						navigation.navigate("Main");
					}}
				>
					<View style={styles.btn}>
						<Text style={styles.btnText}>Lancez la recherche</Text>
					</View>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Search;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		alignContent: "center",
		justifyContent: "center",
		borderBottomWidth: 55,
		borderBottomColor: "transparent",
		paddingHorizontal: 10,
	},
	inputLabel: {
		fontSize: 15,
		fontWeight: "500",
		color: COLORS.placeholder_text_color,
	},
	/** Form */
	form: {
		paddingHorizontal: 10,
		paddingTop: 20,
	},
	/** Input */
	input: {
		marginBottom: 12,
	},
	inputControlSelect: {
		minHeight: 44,
		borderWidth: 0,
		backgroundColor: COLORS.gray,
		paddingHorizontal: 16,
		borderRadius: 12,
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		shadowOffset: {
			height: 0,
			width: 1,
		},
		elevation: 2,
	},
	inputControl: {
		minHeight: 44,
		borderWidth: 0,
		backgroundColor: COLORS.gray,
		paddingHorizontal: 16,
		borderRadius: 12,
		fontSize: 15,
		fontWeight: "500",
		color: COLORS.black_ligth,
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		shadowOffset: {
			height: 0,
			width: 1,
		},
		elevation: 2,
		zIndex: 0,
	},

	textStyle: {
		fontWeight: "500",
		color: COLORS.black_ligth,
		fontSize: 15,
	},
	/** Button */
	btn: {
		// flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 10,
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
