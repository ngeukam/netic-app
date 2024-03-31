import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";
import { Dropdown } from "react-native-element-dropdown";

const SelectDlvField = ({ value, setValue }) => {
	const data = [
		{ label: "Douala", value: 1 },
		{ label: "Yaoundé", value: 2 },
	];
	const [isFocus, setIsFocus] = useState(false);
	return (
		<View style={styles.container}>
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: COLORS.blue }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				imageStyle={styles.imageStyle}
				data={data}
				search
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? "Ville d'arrivée" : "..."}
				searchPlaceholder="Recherchez..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					setValue(item.value);
					setIsFocus(false);
				}}
			/>
		</View>
	);
};

export default SelectDlvField;
const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
	},
	dropdown: {
		height: 44,
		borderColor: COLORS.gray,
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		backgroundColor: COLORS.gray,
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		shadowOffset: {
			height: 0,
			width: 1,
		},
		elevation: 2,
	},
	icon: {
		marginRight: 5,
	},

	placeholderStyle: {
		fontSize: 16,
		color: COLORS.placeholder_text_color,
		fontWeight: 500,
	},
	selectedTextStyle: {
		fontSize: 15,
		fontWeight: "500",
		color: COLORS.black_ligth,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
