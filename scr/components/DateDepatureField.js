import {
	View,
	Text,
	TextInput,
	Pressable,
	Platform,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../constants";

const DateDepartureField = ({
	style,
	date,
	value,
	onChangeText,
	showPicker,
	toggleDatePicker,
	onChange,
	confirmIOSDate,
}) => {
	console.log(date)
	return (
		<View>
			{showPicker && (
				<DateTimePicker
					mode="date"
					display="spinner"
					value={date}
					onChange={onChange}
					style={styles.datepicker}
					maximumDate={new Date(2030, 10, 20)}
					minimumDate={date}
					
				/>
			)}
			{showPicker && Platform.OS === "ios" && (
				<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
					<TouchableOpacity
						style={[
							styles.button,
							styles.pickerButton,
							{ backgroundColor: COLORS.gray },
						]}
						onPress={toggleDatePicker}
					>
						<Text style={[styles.buttonText, { color: COLORS.green }]}>
							Cancel
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.pickerButton]}
						onPress={confirmIOSDate}
					>
						<Text style={[styles.buttonText]}>Confirm</Text>
					</TouchableOpacity>
				</View>
			)}

			{!showPicker && (
				<Pressable onPress={toggleDatePicker}>
					<TextInput
						style={style}
						placeholder="Départ recupération"
						onChangeText={onChangeText}
						value={value}
						editable={false}
						onPressIn={toggleDatePicker}
					/>
				</Pressable>
			)}
		</View>
	);
};

export default DateDepartureField;
const styles = StyleSheet.create({
	datepicker: {
		height: 120,
		marginTop: -10,
	},
	button: {
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		marginTop: 10,
		marginBottom: 15,
		backgroundColor: COLORS.gray,
	},
	pickerButton: {
		paddingHorizontal: 20,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "500",
		color: COLORS.white,
	},
});
