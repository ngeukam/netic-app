import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";
import { VehiculesItem } from "../utils/VehiculesItem";
import { SelectCountry } from "react-native-element-dropdown";

const SelectVehiculeField = ({
	value,
	setValue,
}) => {
	const [isFocus, setIsFocus] = useState(false);

	return (
		<View style={styles.container}>
			<SelectCountry
				style={[styles.dropdown, isFocus && { borderColor: COLORS.blue }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				imageStyle={styles.imageStyle}
				data={VehiculesItem}
				search
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? "Véhicule adapté" : "..."}
				searchPlaceholder="Recherchez..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					setValue(item.value);
					setIsFocus(false);
				}}
				imageField="image"
			/>
		</View>
	);
};

export default SelectVehiculeField;


const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
		// padding: 16,
	},
	imageStyle: {
		width: 24,
		height: 24,
		marginRight: 5
	},
	dropdown: {
		height: 44,
		borderColor: COLORS.gray,
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
		backgroundColor:COLORS.gray,
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
		fontWeight: 400,
	},
	selectedTextStyle: {
		fontSize: 16,
		fontWeight: "400",
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

