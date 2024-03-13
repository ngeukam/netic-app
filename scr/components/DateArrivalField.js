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

const DateArrivalField = ({
	style,
	value,
	onChangeArrivalText,
	showPickerArrival,
	toggleDateArrivalPicker,
	onChangeArrival,
	confirmIOSArrivalDate,
    date
}) => {
	return (
		<View>
			{showPickerArrival && (
				<DateTimePicker
					mode="date"
					display="spinner"
					value={date}
					onChange={onChangeArrival}
					style={styles.datepicker}
					maximumDate={new Date(2030, 10, 20)}
					minimumDate={date}
                    
				/>
			)}
			{showPickerArrival && Platform.OS === "ios" && (
				<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
					<TouchableOpacity
						style={[
							styles.button,
							styles.pickerButton,
							{ backgroundColor: COLORS.gray },
						]}
						onPress={toggleDateArrivalPicker}
					>
						<Text style={[styles.buttonText, { color: COLORS.green }]}>
							Cancel
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.pickerButton]}
						onPress={confirmIOSArrivalDate}
					>
						<Text style={[styles.buttonText]}>Confirm</Text>
					</TouchableOpacity>
				</View>
			)}

			{!showPickerArrival && (
				<Pressable onPress={toggleDateArrivalPicker}>
					<TextInput
						style={style}
						placeholder="Départ d'arrivée"
						onChangeText={onChangeArrivalText}
						value={value}
						editable={false}
						onPressIn={toggleDateArrivalPicker}
					/>
				</Pressable>
			)}
		</View>
	);
};

export default DateArrivalField;
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
