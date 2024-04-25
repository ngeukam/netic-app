import { StyleSheet } from "react-native";
import { useState } from "react";
import { DeviseItem } from "../utils/DeviseItem";
import { COLORS } from "../constants";
import { Dropdown } from "react-native-element-dropdown";

const SelectDeviseField = ({ value, setValue }) => {
	const [isFocus, setIsFocus] = useState(false);

	return (
		<Dropdown
			style={[styles.dropdown, isFocus && { borderColor: COLORS.blue }]}
			selectedTextStyle={styles.selectedTextStyle}
			data={DeviseItem}
			maxHeight={200}
			labelField="label"
			valueField="value"
			value={value}
			onFocus={() => setIsFocus(true)}
			onBlur={() => setIsFocus(false)}
			onChange={(item) => {
				setValue(item.value);
				setIsFocus(false);
			}}
		/>
	);
};

export default SelectDeviseField;

const styles = StyleSheet.create({
	dropdown: {
		flex: 1,
		height: 44,
		borderColor: COLORS.gray,
		borderWidth: 0,
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
	selectedTextStyle: {
		fontSize: 15,
		fontWeight: "500",
		color: COLORS.black_ligth,
	},
});
