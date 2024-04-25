import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "../../config";
import { COLORS } from "../constants";
import { View, StyleSheet } from "react-native";
const GooglePlacesDepartureInput = ({
	placeholder,
	onPress,
	setDeparturePlace,
	GooglePlaceRef,
}) => {
	
	return (
		<View style={{ flex: 1, zIndex: 2000 }}>
			<GooglePlacesAutocomplete
				placeholder={placeholder}
				fetchDetails={true}
				ref={GooglePlaceRef}
				listViewDisplayed="auto"
				debounce={400}
				minLength={2}
				onPress={onPress}
				query={{
					key: API_KEY,
					language: "fr",
					components: "country:cm",
				}}
				styles={textInputStyle}
				textInputProps={{
					onChangeText: (text) => {
						setDeparturePlace(text);
					},
					autoFocus: false,
				}}
				onFail={(error) => console.log(error)}
			/>
		</View>
	);
};

export default GooglePlacesDepartureInput;
const textInputStyle = StyleSheet.create({
	container: {
		flex: 1,
		position: "absolute",
		zIndex: 9999,
		width: "100%",
	},
	textInputContainer: {
		flexDirection: "row",
	},
	textInput: {
		minHeight: 44,
		borderWidth: 0,
		backgroundColor: COLORS.gray,
		paddingHorizontal: 10,
		borderRadius: 8,
		fontSize: 16,
		fontWeight: "400",
		color: COLORS.black_ligth,
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		shadowOffset: {
			height: 0,
			width: 1,
		},
		elevation: 2,
	},
	poweredContainer: {
		justifyContent: "flex-end",
		alignItems: "center",
		borderBottomRightRadius: 8,
		borderBottomLeftRadius: 8,
		borderColor: "#c8c7cc",
		borderTopWidth: 0.5,
	},
	powered: {},
	listView: {},
	row: {
		backgroundColor: "#FFFFFF",
		padding: 13,
		height: 44,
		flexDirection: "row",
	},
	separator: {
		height: 0.5,
		backgroundColor: "#c8c7cc",
	},
	description: {},
	loader: {
		flexDirection: "row",
		justifyContent: "flex-end",
		height: 20,
	},
});
