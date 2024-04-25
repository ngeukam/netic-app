import {
	View,
	SafeAreaView,
	StyleSheet,
	Platform,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
import { useState, useContext, useEffect, useRef } from "react";
import { COLORS } from "../constants";
import Header2 from "../components/Header2";
import SelectProductField from "../components/SelectProductField";
import SelectVehiculeField from "../components/SelectVehiculeField";
import InputField from "../components/InputField";
import SelectDeviseField from "../components/SelectDeviseField";
import MapViewCard from "../components/MapViewCard";
import Button from "../components/Button";
import { instance } from "../../config";
import { ToastSuccessMessage } from "../components/ToastSuccessMessage";
import { ToastErrorMessage } from "../components/ToastErrorMessage";
import { AuthContext } from "../context/AuthContext";
import { LocationContext } from "../context/LocationContext";
import { useIsFocused } from "@react-navigation/native";
import GooglePlacesDepartureInput from "../components/GooglePlacesDepartureInput";
import GoogleArrivalPlacesInput from "../components/GoogleArrivalPlacesInput";
import currencyFormat from "../utils/CurrencyFormat";

const CreatePublication = () => {
	const GooglePlaceRef = useRef(null);
	const GoogleArrivalRef = useRef(null);
	const focused = useIsFocused();
	const { userId, sendNotification } = useContext(AuthContext);
	const { location } = useContext(LocationContext);
	let lat = location?.coords?.latitude;
	let long = location?.coords?.longitude;
	const [load, setLoad] = useState(false);
	const [quantity, setQuantity] = useState(null);
	const [budget, setBudget] = useState(null);
	const [departure_place, setDeparturePlace] = useState();
	const [lat_departure_place, setLatDeparturePlace] = useState();
	const [long_departure_place, setLongDeparturePlace] = useState();
	const [arrival_place, setArrivalPlace] = useState();
	const [lat_arrival_place, setLatArrivalPlace] = useState();
	const [long_arrival_place, setLongArrivalPlace] = useState();
	const [product, setProduct] = useState();
	const [vehicule, setVehicule] = useState();
	const [devise, setDevise] = useState("1");
	const [message, setMessage] = useState();
	const formData = {
		quantity: quantity,
		budget: budget,
		order_user: userId,
		departure_place: departure_place,
		arrival_place: arrival_place,
		product: product,
		vehicule: vehicule,
		devise: devise,
		message: message,
		lat_arrival_place: lat_arrival_place,
		long_arrival_place: long_arrival_place,
		lat_departure_place: lat_departure_place,
		long_departure_place: long_departure_place,
	};
	useEffect(() => {
		setArrivalPlace();
		setBudget();
		setDeparturePlace();
		setDevise("1");
		setMessage();
		setProduct();
		setQuantity();
		setVehicule();
		setLatArrivalPlace();
		setLatDeparturePlace();
		setLongArrivalPlace();
		setLongArrivalPlace();
		GooglePlaceRef.current?.setAddressText("");
		GoogleArrivalRef.current?.setAddressText("");
	}, [focused]);

	const handleCreatePublication = async () => {
		if (!product || !quantity || !vehicule || !budget) {
			ToastErrorMessage("Vous avez laissé des champs vides.");
			return;
		} else if (
			!departure_place ||
			!arrival_place ||
			!lat_departure_place ||
			!long_departure_place
		) {
			ToastErrorMessage("Vous devez préciser les lieux.");
			return;
		} else {
			setLoad(true);
			await instance
				.post(`order/`, formData)
				.then(async function () {
					await instance
						.post(`distance`, {
							lat: lat,
							long: long,
							lat_departure_place: JSON.parse(lat_departure_place),
							long_departure_place: JSON.parse(long_departure_place),
						})
						.then((response) => {
							if (response.data?.distance < 20) {
								sendNotification(
									`Un nouveau job vous attend. Le bugdet proposé est de ${currencyFormat(
										JSON.parse(budget),
										JSON.parse(devise)
									)}`
								);
							}
						});

					ToastSuccessMessage(
						"Votre demande est maintentant visible dans le réseau."
					);
				})
				.finally(() => {
					setArrivalPlace();
					setBudget();
					setDeparturePlace();
					setDevise("1");
					setMessage();
					setProduct();
					setQuantity();
					setVehicule();
					setLatArrivalPlace();
					setLatDeparturePlace();
					setLongArrivalPlace();
					setLongArrivalPlace();
					GooglePlaceRef.current?.setAddressText("");
					GoogleArrivalRef.current?.setAddressText("");
					setLoad(false);
				});
		}
	};
	const handleonPressDeparture = (data, details = null) => {
		// setDeparturePlace(JSON.stringify(data?.description));
		setLatDeparturePlace(JSON.stringify(details?.geometry?.location?.lat));
		setLongDeparturePlace(JSON.stringify(details?.geometry?.location?.lng));
	};
	const handleonPressArrival = (data, details = null) => {
		// setArrivalPlace(JSON.stringify(data?.description));
		setLatArrivalPlace(JSON.stringify(details?.geometry?.location?.lat));
		setLongArrivalPlace(JSON.stringify(details?.geometry?.location?.lng));
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
						<View style={{ paddingBottom: 50 }}>
							<GooglePlacesDepartureInput
								placeholder={"Lieu de départ ou de récupération"}
								onPress={handleonPressDeparture}
								setDeparturePlace={setDeparturePlace}
								GooglePlaceRef={GooglePlaceRef}
							/>
						</View>
						<View style={{ paddingBottom: 50 }}>
							<GoogleArrivalPlacesInput
								placeholder={"Lieu d'arrivé ou de livraison"}
								onPress={handleonPressArrival}
								setArrivalPlace={setArrivalPlace}
								GoogleArrivalRef={GoogleArrivalRef}
							/>
						</View>
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
									fontSize: 16,
									fontWeight: "400",
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
			{/* <Button
				style4={styles.pressable}
				onPress={getCurrentLocation}
				imgicon={icons.current_position}
				style5={{ height: 40, width: 40, tintColor: COLORS.white }}
			/> */}
			<View style={{ flexDirection: "row" }}>
				<MapViewCard />
			</View>
		</SafeAreaView>
	);
};

export default CreatePublication;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		paddingTop: 25,
		zIndex: 0,
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
		zIndex: 2,
	},
	/** Form */
	form: {
		paddingHorizontal: 10,
		// paddingTop: 10,
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
	rowdevise: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	budgetupstyle: {
		paddingLeft: 5,
		width: "65%",
	},
	textStyle: {
		fontWeight: "400",
		color: COLORS.black_ligth,
		fontSize: 16,
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
