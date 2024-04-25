import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Platform,
	Linking,
	Image,
	ActivityIndicator,
	Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { COLORS, icons } from "../constants";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";
import { instance } from "../../config";
import currencyFormat from "../utils/CurrencyFormat";
import FChoiceProd from "../utils/FChoiceProd";
import FChoiceVehicule from "../utils/FChoiceVehicule";
import FProdName from "../utils/FProdName";
import moment from "moment";
import { ToastSuccessMessage } from "../components/ToastSuccessMessage";
import { ToastErrorMessage } from "../components/ToastErrorMessage";
import { useNavigation } from "@react-navigation/native";
const Details = ({ route }) => {
	const navigation = useNavigation();
	const [data, setData] = useState([]);
	const [load, setLoad] = useState(true);
	const [userphone, setUserPhone] = useState();
	const makePhoneCall = (phone) => {
		if (Platform.OS === "android") {
			Linking.openURL(`tel:${phone}`);
		} else {
			Linking.openURL(`tel:${phone}`);
		}
	};
	const NoPhoneNumber = () => {
		Alert.alert(
			"Oups",
			"Bien voloir fair une nouvelle demande pour avoir un coursier."
		);
	};
	async function openMap(latitude, longitude, label = "MyLabel") {
		const tag = `${Platform.OS === "ios" ? "maps" : "geo"}:0,0?q=`;
		const link = Platform.select({
			ios: `${tag}${label}@${latitude},${longitude}`,
			android: `${tag}${latitude},${longitude}(${label})`,
		});

		try {
			const supported = await Linking.canOpenURL(link);

			if (supported) Linking.openURL(link);
		} catch (error) {
			console.log(error);
		}
	}
	const handleGetUserPhone = async (id) => {
		await instance.get(`user-phone/${id}`).then((response) => {
			setUserPhone(response.data?.phone_number);
		});
	};
	const handleGetOrderDetails = async () => {
		await instance
			.get(`order/${route.params?.id}`)
			.then((response) => {
				setData(response.data);
				if (response.data?.accepted[0]?.user !== undefined) {
					handleGetUserPhone(response.data?.accepted[0]?.user);
				}
			})
			.finally(() => {
				setLoad(false);
			});
	};

	const handleDeleteOrder = async () => {
		setLoad(true);
		await instance
			.delete(`order/${route.params?.id}`)
			.then((response) => {
				if (response?.status == 204) {
					ToastSuccessMessage("Cette demande a été supprimée!");
					navigation.goBack();
				} else if (response?.status == 200) {
					ToastErrorMessage("Cette demande a été accpetée pour un job.");
				}
			})
			.finally(() => {
				setLoad(false);
			});
	};
	const DeleteAlert = () => {
		Alert.alert("Suppression", "Voulez-vous supprimez cette demande ?", [
			{
				text: "Annuler",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{ text: "Valider", onPress: () => handleDeleteOrder() },
		]);
	};
	const handlePublishOrder = async () => {
		if (route.params?.is_paid) {
			ToastErrorMessage(
				"Désolé, cette demande est facturée, elle ne peut être publiée."
			);
		} else {
			setLoad(true);
			await instance.put(`job/${route.params?.id}`).then(() => {
				ToastSuccessMessage("La demande est à nouveau visible dans le réseau.");
				navigation.goBack();
				setLoad(false);
			});
		}
	};

	useEffect(() => {
		handleGetOrderDetails();
	}, []);
	if (load) {
		return (
			<SafeAreaView style={styles.container}>
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator size={"large"} color={COLORS.blue} />
				</View>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={{ padding: 10 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignContent: "center",
							justifyContent: "center",
							marginVertical: 16,
						}}
					>
						{data?.accepted?.length !== 0 && (
							<Button
								buttontext="Appelez le coursier"
								style3={styles.stylecallbuttontext}
								style2={styles.stylecallbuttoncontainer}
								iconcolor="white"
								iconname="phone-call"
								iconsize={24}
								onPress={() =>
									route.params?.is_paid == false
										? makePhoneCall(userphone)
										: NoPhoneNumber()
								}
							/>
						)}
					</View>

					<View
						style={{
							justifyContent: "center",
							alignContent: "center",
							justifyContent: "center",
							rowGap: 10,
							marginBottom: 15,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								flex: 1,
								justifyContent: "space-between",
							}}
						>
							<View style={{ flexDirection: "column" }}>
								<Text
									style={[
										styles.inputLabel,
										{ fontWeight: 500, color: COLORS.placeholder_text_color },
									]}
								>
									À transporter
								</Text>
								<Text style={styles.inputLabel}>{FProdName(data.product)}</Text>
							</View>
							{
								<Image
									source={FChoiceProd(data.product)}
									style={{ width: 60, height: 60 }}
								/>
							}
						</View>

						<View style={{ flexDirection: "col" }}>
							<Text
								style={[
									styles.inputLabel,
									{
										fontWeight: 500,
										color: COLORS.placeholder_text_color,
									},
								]}
							>
								Lieu de recupération
								<Feather
									name="map-pin"
									size={24}
									color={COLORS.blue}
									onPress={() => {
										openMap(
											data.lat_departure_place,
											data.long_departure_place,
											`Lieu de récup ${data.departure_place}`
										);
									}}
								/>
							</Text>
							<Text style={styles.inputLabel}>{data.departure_place}</Text>
						</View>
						<View style={{ flexDirection: "col" }}>
							<Text
								style={[
									styles.inputLabel,
									{ fontWeight: 500, color: COLORS.placeholder_text_color },
								]}
							>
								Lieu d'arrivé
								<Feather
									name="map-pin"
									size={24}
									color={COLORS.red}
									onPress={() => {
										openMap(
											data.lat_arrival_place,
											data.long_arrival_place,
											`Lieu de livraison ${data.arrival_place}`
										);
									}}
								/>
							</Text>
							<Text style={styles.inputLabel}>{data.arrival_place}</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								flex: 1,
								justifyContent: "space-between",
							}}
						>
							<Text
								style={[
									styles.inputLabel,
									{ fontWeight: 500, color: COLORS.placeholder_text_color },
								]}
							>
								Quantité/Nombre
							</Text>
							<Text style={styles.inputLabel}>{data.quantity}</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								flex: 1,
								justifyContent: "space-between",
							}}
						>
							<Text
								style={[
									styles.inputLabel,
									{ fontWeight: 500, color: COLORS.placeholder_text_color },
								]}
							>
								Budget prévu
							</Text>
							<Text style={[styles.inputLabel, { fontWeight: "500" }]}>
								{data.budget && currencyFormat(data.budget, data.devise)}
							</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								flex: 1,
								justifyContent: "space-between",
							}}
						>
							<Text
								style={[
									styles.inputLabel,
									{ fontWeight: 500, color: COLORS.placeholder_text_color },
								]}
							>
								Véhicule souhaité
							</Text>
							<Image
								source={FChoiceVehicule(data.vehicule)}
								style={{ width: 60, height: 60 }}
							/>
						</View>

						{data.message && (
							<View style={{ flexDirection: "col" }}>
								<Text
									style={[
										styles.inputLabel,
										{ fontWeight: 500, color: COLORS.placeholder_text_color },
									]}
								>
									Message
								</Text>
								<Text style={styles.inputLabel}>{data.message}</Text>
							</View>
						)}

						<View
							style={{
								flexDirection: "row",
								flex: 1,
								justifyContent: "space-between",
							}}
						>
							<Text
								style={[
									styles.inputLabel,
									{ fontWeight: 500, color: COLORS.placeholder_text_color },
								]}
							>
								Date de création
							</Text>
							<Text>
								{moment(data.created_at).startOf("minutes").fromNow()}
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignContent: "center",
							justifyContent: "space-around",
						}}
					>
						{!route.params?.job_status && (
							<Button
								buttontext="Supprimer"
								style3={styles.stylecallbuttontext}
								style2={styles.styledelbuttoncontainer}
								iconcolor="white"
								iconname="trash"
								iconsize={24}
								onPress={DeleteAlert}
							/>
						)}
						<Button
							buttontext="Modifier"
							style3={styles.stylecallbuttontext}
							style2={styles.styleupdatebuttoncontainer}
							iconcolor="white"
							iconname="edit"
							iconsize={24}
							onPress={() =>
								navigation.navigate("Edit_Publication", {
									ref: data.reference,
									product: data.product,
									quantity: data.quantity,
									vehicule: data.vehicule,
									budget: data.budget,
									is_paid: data.is_paid,
									devise: data.devise,
									departure_place: data.departure_place,
									arrival_place: data.arrival_place,
									id: data.id,
									job_status: route.params?.job_status,
									lat_departure_place: data.lat_departure_place,
									lat_arrival_place: data.lat_arrival_place,
									long_departure_place: data.long_departure_place,
									long_arrival_place: data.long_arrival_place,
								})
							}
						/>
						{route.params?.job_status && (
							<Button
								buttontext="Republier"
								style3={styles.stylecallbuttontext}
								style2={styles.stylepubbuttoncontainer}
								imgicon={icons.retwitw}
								style5={{ height: 27, width: 25 }}
								onPress={() => {
									handlePublishOrder();
								}}
							/>
						)}
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}
};

export default Details;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	inputLabel: {
		fontSize: 17,
		fontWeight: "400",
		color: COLORS.black_ligth,
	},
	stylecallbuttontext: {
		fontSize: 17,
		lineHeight: 24,
		fontWeight: "600",
		color: COLORS.white,
		textAlign: "center",
		marginRight: 5,
	},
	stylecallbuttoncontainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 8,
		// paddingHorizontal: 20,
		borderWidth: 1,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
	},
	styledelbuttoncontainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 3,
		// paddingHorizontal: 2,
		borderWidth: 1,
		backgroundColor: COLORS.red,
		borderColor: COLORS.red,
	},
	styleupdatebuttoncontainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 3,
		// paddingHorizontal: 2,
		borderWidth: 1,
		backgroundColor: COLORS.placeholder_text_color,
		borderColor: COLORS.placeholder_text_color,
	},
	stylepubbuttoncontainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 3,
		// paddingHorizontal: 2,
		borderWidth: 1,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
	},
	iconstyle: {
		width: 25,
		height: 25,
		marginLeft: 10,
	},
});
