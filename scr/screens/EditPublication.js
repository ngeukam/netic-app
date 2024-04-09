import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Platform,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
import { useState, useContext, useEffect, useRef } from "react";
import { COLORS } from "../constants";
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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import GooglePlacesDepartureInput from "../components/GooglePlacesDepartureInput";
import GoogleArrivalPlacesInput from "../components/GoogleArrivalPlacesInput";

const EditPublication = ({ route }) => {
	const GooglePlaceRef = useRef(null);
	const GoogleArrivalRef = useRef(null);
	const navigation = useNavigation();
	const focused = useIsFocused();
	const { userId } = useContext(AuthContext);
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
		setArrivalPlace(route.params?.arrival_place);
		setBudget(JSON.stringify(route.params?.budget));
		setDeparturePlace(route.params?.departure_place);
		setDevise(JSON.stringify(route.params?.devise));
		setMessage(route.params?.message);
		setProduct(JSON.stringify(route.params?.product));
		setQuantity(JSON.stringify(route.params?.quantity));
		setVehicule(JSON.stringify(route.params?.vehicule));
		setLatDeparturePlace(JSON.stringify(route.params?.lat_departure_place));
		setLongDeparturePlace(JSON.stringify(route.params?.long_departure_place));
		setLatArrivalPlace(route.params?.lat_arrival_place);
		setLongArrivalPlace(route.params?.long_arrival_place);
		GooglePlaceRef.current?.setAddressText(route.params?.departure_place);
		GoogleArrivalRef.current?.setAddressText(route.params?.arrival_place);
	}, [focused]);
	console.log(route.params?.is_paid)
	const handleEditPublication = async () => {
		if (!product || !quantity || !vehicule || !budget) {
			ToastErrorMessage("Vous avez laissé des champs vides.");
		} else if (
			!departure_place ||
			!arrival_place ||
			!lat_departure_place ||
			!long_departure_place
		) {
			ToastErrorMessage("Vous devez préciser les lieux.");
		}
		if (route.params?.is_paid) {
			ToastErrorMessage(
				"Désolé, cette demande est facturée, elle ne peut être modifiée."
			);
		} else {
			setLoad(true);
			await instance
				.put(`order/${route.params?.id}`, formData)
				.then(() => {
					ToastSuccessMessage("Votre demande a été modifiée avec succés.");
					navigation.navigate("Publications");
				})
				.finally(() => {
					setLoad(false);
				});
		}
	};
	const handleonPressDeparture = (data, details = null) => {
		setLatDeparturePlace(JSON.stringify(details?.geometry?.location?.lat));
		setLongDeparturePlace(JSON.stringify(details?.geometry?.location?.lng));
	};
	const handleonPressArrival = (data, details = null) => {
		setLatArrivalPlace(JSON.stringify(details?.geometry?.location?.lat));
		setLongArrivalPlace(JSON.stringify(details?.geometry?.location?.lng));
	};
	return (
		<SafeAreaView style={styles.container}>
			{/* <Header2 title="Modification de la demande" /> */}
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
										readOnly={route.params?.job_status ? true : false}
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
									handleEditPublication();
								}}
								style1={styles.formAction}
								style2={styles.btn}
								style3={styles.btnText}
								buttontext={"Modifiez la demande"}
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

export default EditPublication;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		paddingTop: 20,
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
