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
} from "react-native";
import { useState, useEffect } from "react";
import { COLORS } from "../constants";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";
import { instance } from "../../config";
import currencyFormat from "../utils/CurrencyFormat";
import FChoiceProd from "../utils/FChoiceProd";
import FChoiceVehicule from "../utils/FChoiceVehicule";
import FProdName from "../utils/FProdName";
import moment from "moment";

const Details_2 = ({ route }) => {
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
		await instance.get(`order/${route.params?.id}`).then((response) => {
			setData(response.data);
			handleGetUserPhone(response.data?.order_user);
			setLoad(false);
		});
	};
	// const handlePublishOrder = async () => {
	// 	setLoad(true);
	// 	await instance.put(`job/${data?.accepted[0]?.order}`).then(() => {
	// 		ToastSuccessMessage("Le job est de nouveau visible dans le réseau.");
	// 		navigation.goBack();
	// 		setLoad(false);
	// 	});
	// };
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
						<Button
							buttontext="Appelez l'émetteur"
							style3={styles.stylecallbuttontext}
							style2={styles.stylecallbuttoncontainer}
							iconcolor="white"
							iconname="phone-call"
							iconsize={24}
							onPress={() => makePhoneCall(userphone)}
						/>
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
							<View style={{flexDirection:'column'}}>
								<Text
									style={[
										styles.inputLabel,
										{ fontWeight: 500, color: COLORS.placeholder_text_color },
									]}
								>
									À transporter
								</Text>
								<Text style={styles.inputLabel} >
									{FProdName(data.product)}
								</Text>
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
								<Text style={[styles.inputLabel]} numberOfLines={2}>
									{data.message}
								</Text>
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
								{moment(data?.accepted[0]?.created_at)
									.startOf("minutes")
									.fromNow()}
							</Text>
						</View>
					</View>

					{/* <View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignContent: "center",
							justifyContent: "space-around",
						}}
					>
						<Button
							buttontext="Annuler"
							style3={styles.stylecancelbuttontext}
							style2={styles.stylepubbuttoncontainer}
							ioconname={"ban"}
							ioconsize={22}
							ioconcolor={COLORS.white}
							style5={{ height: 27, width: 25 }}
						/>
					</View> */}
				</ScrollView>
			</SafeAreaView>
		);
	}
};

export default Details_2;
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
	stylecancelbuttontext: {
		fontSize: 17,
		lineHeight: 24,
		fontWeight: "600",
		color: COLORS.white,
		textAlign: "center",
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

	stylepubbuttoncontainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 3,
		borderWidth: 1,
		backgroundColor: COLORS.red,
		borderColor: COLORS.red,
	},
	iconstyle: {
		width: 25,
		height: 25,
		marginLeft: 10,
	},
});
