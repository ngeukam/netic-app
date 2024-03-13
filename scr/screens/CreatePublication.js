import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TextInput,
	Platform,
	Image,
	Pressable
} from "react-native";
import React, { useRef, useState } from "react";
import { COLORS } from "../constants";
import Header2 from "../components/Header2";
import SelectProductField from "../components/SelectProductField";
import SelectVehiculeField from "../components/SelectVehiculeField";
import InputField from "../components/InputField";
import SelectDeviseField from "../components/SelectDeviseField";
import { icons } from "../constants";
import MapViewCard from "../components/MapViewCard";
import DateDepartureField from "../components/DateDepatureField";
import DateArrivalField from "../components/DateArrivalField";

const CreatePublication = () => {
	const [product, setProduct] = useState([]);
	const [vehicule, setVehicule] = useState([]);
	const [quantity, setQuantity] = useState();
	const [budget, setBudget] = useState();
	const [device, setDivice] = useState("1");
	const [showPicker, setShowPicker] = useState(false);
	const [showPickerArrival, setShowPickerArrival] = useState(false);
	const [departuredate, setDepartureDate] = useState();
	const [arrivaldate, setArrivalDate] = useState();
	const [date, setDate] = useState(new Date());

	const toggleDatePicker = () => {
		setShowPicker(!showPicker);
	};
	const toggleDateArrivalPicker = () => {
		setShowPickerArrival(!showPickerArrival);
	};
	const onChange = ({ type }, selectedDate) => {
		if (type == "set") {
			const currentDate = selectedDate;
			// setDate(currentDate);
			if (Platform.OS === "android") {
				toggleDatePicker();
				setDepartureDate(currentDate.toDateString());
			}
		} else {
			toggleDatePicker();
		}
	};
	const onChangeArrival = ({ type }, selectedDate) => {
		if (type == "set") {
			const currentDate = selectedDate;
			setDate(currentDate);
			if (Platform.OS === "android") {
				toggleDateArrivalPicker();
				setArrivalDate(currentDate.toDateString());
			}
		} else {
			toggleDateArrivalPicker();
		}
	};
	const formatDate = (rawDate) => {
		let date = new Date(rawDate);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDay();
		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;
		return `${day}-${month}-${year}`;
	};
	const confirmIOSDate = () => {
		setDepartureDate(date.toDateString());
		// setDepartureDate(formatDate(currentDate));
		toggleDatePicker();
	};
	const confirmIOSArrivalDate = () => {
		setArrivalDate(date.toDateString());
		// setDepartureDate(formatDate(currentDate));
		toggleDateArrivalPicker();
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header2 title="Créer une offre" />
			<View style={styles.form}>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<View
						style={{
							flexDirection: "column",
							flex: 1,
							flexGrow: 2.5,
							marginRight: 5,
						}}
					>
						<View style={styles.input}>
							<SelectProductField
								style={styles.inputControlSelect}
								value={product}
								setValue={setProduct}
								zIndex={3000}
								textStyle={styles.textStyle}
							/>
						</View>
					</View>
					<View style={{ flexDirection: "column", flex: 1 }}>
						<View style={styles.input}>
							<InputField
								autoCapitalize="none"
								placeholder="Qté/Nb"
								keyboardType="numeric"
								style={styles.inputControl}
								value={quantity}
								onChangeText={(val) => {
									setQuantity(val);
								}}
							/>
						</View>
					</View>
				</View>

				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<View
						style={{
							flexDirection: "column",
							flex: 1,
							flexGrow: 1,
							marginRight: 5,
						}}
					>
						<View style={styles.input}>
							<SelectVehiculeField
								style={styles.inputControlSelect}
								value={vehicule}
								setValue={setVehicule}
								zIndex={1000}
								textStyle={styles.textStyle}
							/>
						</View>
					</View>
					<View style={{ flexDirection: "column", flex: 1 }}>
						<View style={[styles.input, styles.rowdevise]}>
							<InputField
								autoCapitalize="none"
								placeholder="Budget alloué"
								keyboardType="numeric"
								style={[styles.inputControl, styles.budgetupstyle]}
								value={budget}
								onChangeText={(val) => {
									setBudget(val);
								}}
							/>
							<SelectDeviseField
								value={device}
								setValue={setDivice}
								zIndex={1000}
								style={styles.devise}
								textStyle={styles.textStyle}
							/>
						</View>
					</View>
				</View>
				<View style={{ flexDirection: "row" }}>
					<View style={[styles.input, { flex: 1 }]}>
						<InputField
							autoCapitalize="none"
							placeholder="Lieu de recupération"
							// keyboardType="text"
							style={styles.inputControl}
						/>
					</View>
					<Pressable onPress={() => alert('press current')}>
						<Image
							source={(uri = icons.current_position)}
							resizeMode="contain"
							style={{
								width: 50,
								height: 50,
								right: 0,
								top: 0,
								position: "absolute",
								zIndex: 4,
							}}
						/>
					</Pressable>
				</View>
				<View style={{ flexDirection: "row" }}>
					<View style={[styles.input, { flex: 1 }]}>
						<InputField
							autoCapitalize="none"
							placeholder="Lieu d'arrivé"
							// keyboardType="text"
							style={styles.inputControl}
						/>
					</View>
					<Pressable onPress={() => alert('press ar')}>
						<Image
							source={(uri = icons.current_ar)}
							resizeMode="contain"
							style={{
								width: 50,
								height: 50,
								right: 0,
								top: 0,
								position: "absolute",
								zIndex: 4,
							}}
						/>
					</Pressable>
				</View>
				{/* <View
						style={{ flexDirection: "row", justifyContent: "space-evenly" }}
					>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.inputLabel}>Date de recupération</Text>
							<View style={styles.input}>
								<DateDepartureField
									date={date}
									showPicker={showPicker}
									toggleDatePicker={toggleDatePicker}
									onChange={onChange}
									confirmIOSDate={confirmIOSDate}
									style={[styles.inputControl]}
									value={departuredate}
									onChangeText={setDepartureDate}
								/>
							</View>
						</View>
						<View style={{ flexDirection: "column" }}>
							<Text style={styles.inputLabel}>Date arrivée souhaitée</Text>
							<View style={styles.input}>
								<DateArrivalField
									date={date}
									showPickerArrival={showPickerArrival}
									toggleDateArrivalPicker={toggleDateArrivalPicker}
									onChangeArrival={onChangeArrival}
									confirmIOSArrivalDate={confirmIOSArrivalDate}
									style={styles.inputControl}
									value={arrivaldate}
									onChangeText={setArrivalDate}
									minimumDate={departuredate}
								/>
							</View>
						</View>
					</View> */}

				<TextInput
					style={{
						// flex: 1,
						textAlignVertical: "top",
						justifyContent: "flex-start",
						backgroundColor: COLORS.gray,
						borderRadius: 10,
						paddingHorizontal: 10,
						color:COLORS.black_ligth
					}}
					placeholder="Laissez un message"
					numberOfLines={4}
				/>
				<View style={styles.formAction}>
					<Pressable
						onPress={() => {
							alert("hello");
						}}
					>
						<View style={styles.btn}>
							<View style={{ width: 32 }} />
							<Text style={styles.btnText}>Publiez l'offre</Text>
						</View>
					</Pressable>
				</View>
				<MapViewCard/>
			</View>
		</SafeAreaView>
	);
};

export default CreatePublication;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		paddingTop: 20,
		borderBottomWidth: 55,
		borderBottomColor: "transparent",
	},
	inputLabel: {
		fontSize: 15,
		fontWeight: "500",
		color: COLORS.placeholder_text_color,
	},
	/** Form */
	form: {
		paddingHorizontal: 10,
		// paddingTop: 20,
	},
	formAction: {
		marginVertical: 5,
		marginBottom: 20,
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
		zIndex:0
	},
	devise: {
		borderWidth: 1,
		borderWidth: 0,
		backgroundColor: "transparent",
		borderRadius: 12,
		paddingHorizontal: 5,
		minHeight: 44,
		zIndex: 1,
		left: 105,
		position: "absolute",
	},
	rowdevise: {
		flexDirection: "row",
	},
	budgetupstyle: {
		position: "absolute",
		top: 0,
		left: 0,
		paddingHorizontal: 70,
		paddingLeft: 5,
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
		paddingVertical: 5,
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
