import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TextInput,
	Platform,
	Image,
	Pressable,
	ScrollView,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState, useContext, useEffect } from "react";
import { COLORS } from "../constants";
import Header2 from "../components/Header2";
import SelectProductField from "../components/SelectProductField";
import SelectVehiculeField from "../components/SelectVehiculeField";
import InputField from "../components/InputField";
import SelectDeviseField from "../components/SelectDeviseField";
import { icons } from "../constants";
import MapViewCard from "../components/MapViewCard";
import Button from "../components/Button";
import { instance } from "../../config";
import { ToastSuccessMessage } from "../components/ToastSuccessMessage";
import { ToastErrorMessage } from "../components/ToastErrorMessage";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import "core-js/stable/atob";
import Checkbox from "expo-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CreatePublication = () => {
	const focused = useIsFocused();
	const { userToken } = useContext(AuthContext);
	const { user_id } = jwtDecode(userToken, { playload: true });
	const [load, setLoad] = useState(false);
	const [quantity, setQuantity] = useState(null);
	const [budget, setBudget] = useState(null);
	const [departure_place, setDeparturePlace] = useState("");
	const [arrival_place, setArrivalPlace] = useState("");
	const [product, setProduct] = useState(null);
	const [vehicule, setVehicule] = useState(null);
	const [devise, setDevise] = useState("1");
	const [message, setMessage] = useState("");
	const formData = {
		quantity: quantity,
		budget: budget,
		order_user: user_id,
		departure_place: departure_place,
		arrival_place: arrival_place,
		product: product,
		vehicule: vehicule,
		devise: devise,
		message: message,
	};
	const [pickupIsChecked, setpickupIsChecked] = useState(false);
	const [deliveryIsChecked, setdeliveryIsChecked] = useState(false);
	useEffect(() => {
		setArrivalPlace("");
		setBudget("");
		setDeparturePlace("");
		setDevise("1");
		setMessage("");
		setProduct("");
		setQuantity("");
		setVehicule("");
	}, [focused]);
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);
	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true); // or some other action
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false); // or some other action
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);
	const getCurrentLocation = () => {
		alert("to get current position");
	};

	const handleCreatePublication = async () => {
		if (!product || !quantity || !vehicule || !budget) {
			ToastErrorMessage("Vous avez laissé des champs vides.");
		} else if (
			!departure_place &
			!arrival_place &
			!pickupIsChecked &
			!deliveryIsChecked
		) {
			ToastErrorMessage("Vous devez préciser au moins un lieu.");
		} else if (!arrival_place & pickupIsChecked) {
			ToastErrorMessage("Vous devez préciser le lieu de livraison.");
		} else if (!departure_place & deliveryIsChecked) {
			ToastErrorMessage("Vous devez préciser le lieu de récupération.");
		} else if (pickupIsChecked & deliveryIsChecked) {
			ToastErrorMessage("Vous devez préciser au moins un lieu.");
		} else {
			setLoad(true);
			await instance.post(`order/`, formData).then(() => {
				setArrivalPlace("");
				setBudget("");
				setDeparturePlace("");
				setDevise("1");
				setMessage("");
				setProduct("");
				setQuantity("");
				setVehicule("");
				ToastSuccessMessage(
					"Votre demande est maintentant visible dans le réseau."
				);
				setLoad(false);
			});
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<Header2 title="Créer une demande" />
			<KeyboardAvoidingView
				nestedScrollEnabled={true}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.form}>
						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}
						>
							<View
								style={{
									flexDirection: "column",
									flex: 1,
									flexGrow: 2,
									marginRight: 5,
								}}
							>
								<View style={styles.input}>
									<SelectProductField value={product} setValue={setProduct} />
								</View>
							</View>
							<View style={{ flexDirection: "column", flex: 1 }}>
								<View style={styles.input}>
									<InputField
										autoCapitalize="none"
										placeholder="Qté/Nbre"
										keyboardType="numeric"
										style={styles.inputControl}
										value={quantity}
										onChangeText={setQuantity}
									/>
								</View>
							</View>
						</View>

						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}
						>
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
										style={styles.inputControl}
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
										placeholder="Votre budget"
										keyboardType="numeric"
										style={[styles.inputControl, styles.budgetupstyle]}
										value={budget}
										onChangeText={setBudget}
									/>
									<SelectDeviseField value={devise} setValue={setDevise} />
								</View>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								paddingBottom: 10,
								justifyContent: "flex-start",
							}}
						>
							{!pickupIsChecked ? (
								<Text
									style={{
										fontSize: 14,
										color: COLORS.placeholder_text_color,
										fontWeight: 400,
									}}
								>
									Cochez la case s'il n'ya pas de lieu de récup.
								</Text>
							) : (
								<Text
									style={{
										fontSize: 14,
										color: COLORS.placeholder_text_color,
										fontWeight: 400,
									}}
								>
									Décochez la case s'il y'a un lieu de récup.
								</Text>
							)}
							<Checkbox
								style={styles.checkbox}
								value={pickupIsChecked}
								onValueChange={setpickupIsChecked}
								color={pickupIsChecked ? COLORS.blue : undefined}
							/>
						</View>
						{!pickupIsChecked ? (
							<View style={{ flexDirection: "row" }}>
								<View style={[styles.input, { flex: 1 }]}>
									<InputField
										autoCapitalize="none"
										placeholder="Précisez un lieu de recupération"
										value={departure_place}
										onChangeText={setDeparturePlace}
										style={styles.inputControl}
									/>
								</View>
							</View>
						) : (
							<></>
						)}
						<View
							style={{
								flexDirection: "row",
								paddingBottom: 10,
								justifyContent: "flex-start",
							}}
						>
							{!deliveryIsChecked ? (
								<Text
									style={{
										fontSize: 14,
										color: COLORS.placeholder_text_color,
										fontWeight: 400,
									}}
								>
									Cochez la case s'il n'ya pas de lieu de livraison.
								</Text>
							) : (
								<Text
									style={{
										fontSize: 14,
										color: COLORS.placeholder_text_color,
										fontWeight: 400,
									}}
								>
									Décochez la case s'il y'a un lieu de livraison.
								</Text>
							)}
							<Checkbox
								style={styles.checkbox}
								value={deliveryIsChecked}
								onValueChange={setdeliveryIsChecked}
								color={deliveryIsChecked ? COLORS.blue : undefined}
							/>
						</View>
						{!deliveryIsChecked ? (
							<View style={{ flexDirection: "row" }}>
								<View style={[styles.input, { flex: 1 }]}>
									<InputField
										autoCapitalize="none"
										placeholder="Précisez un lieu d'arrivé"
										value={arrival_place}
										onChangeText={setArrivalPlace}
										style={styles.inputControl}
									/>
								</View>
							</View>
						) : (
							<></>
						)}
						<View style={{ flexDirection: "row" }}>
							<InputField
								style={{
									// flex: 1,
									textAlignVertical: "top",
									justifyContent: "flex-start",
									backgroundColor: COLORS.gray,
									borderRadius: 10,
									paddingHorizontal: 10,
									color: COLORS.black_ligth,
									fontSize: 15,
									fontWeight: "500",
									paddingHorizontal: 16,
									flex: 1,
								}}
								placeholder="Laissez un message"
								numberOfLines={4}
								value={message}
								onChangeText={setMessage}
							/>
						</View>
						<View style={{ flexDirection: "row" }}>
							<Button
								onPress={() => {
									handleCreatePublication();
								}}
								style1={styles.formAction}
								style2={styles.btn}
								style3={styles.btnText}
								buttontext={"Publiez la demande"}
								activityIndicator={load ? true : false}
								disabled={load ? true : false}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
			<Button
				style4={styles.pressable}
				onPress={getCurrentLocation}
				imgicon={icons.current_position}
				style5={{ height: 40, width: 40, tintColor: COLORS.white }}
			/>
			<View style={{ flexDirection: "row",}}>
				{!isKeyboardVisible ? <MapViewCard /> : <></>}
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
	},

	pressable: {
		height: Platform.OS === "ios" ? 30 : 50,
		width: Platform.OS === "ios" ? 60 : 50,
		borderRadius: Platform.OS === "ios" ? 17 : 12,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		right: 30,
		bottom: 0,
		zIndex:2
	},
	inputLabel: {
		fontSize: 15,
		fontWeight: "500",
		color: COLORS.placeholder_text_color,
	},
	/** Form */
	form: {
		paddingHorizontal: 10,
		paddingTop:10,
		// alignContent:'center',
		// justifyContent:'center',
		

	},
	formAction: {
		marginVertical: 10,
		flex: 1,
		alignContent: "center",
		justifyContent: "center",
	},
	/** Input */
	input: {
		marginBottom: 12,
	},

	inputControl: {
		minHeight: 44,
		borderWidth: 0,
		backgroundColor: COLORS.gray,
		paddingHorizontal: 16,
		borderRadius: 8,
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
	rowdevise: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	budgetupstyle: {
		paddingLeft: 5,
		width: "65%",
	},
	textStyle: {
		fontWeight: "500",
		color: COLORS.black_ligth,
		fontSize: 15,
	},
	/** Button */
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
