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
import React, { useState, useEffect } from "react";
import { COLORS, icons, images } from "../constants";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";
import { instance } from "../../config";
import currencyFormat from "../utils/CurrencyFormat";
import FChoiceProd from "../utils/FChoiceProd";
import FChoiceVehicule from "../utils/FChoiceVehicule";
import moment from "moment";
import { ToastErrorMessage } from "../components/ToastErrorMessage";
const Details = ({ route }) => {
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
	openGps = (latitude = 4.0429408, longitude = 9.706203) => {
		const location = `${latitude},${longitude}`;
		const url = Platform.select({
			ios: `maps:${location}`,
			android: `geo:${location}?center=${location}&q=${location}&z=16`,
		});
		Linking.openURL(url);
	};
	const handleGetUserPhone = async (id) => {
		await instance.get(`user-phone/${id}`).then((response) => {
			setUserPhone(response.data?.phone_number);
		});
	};
	const handleGetOrderDetails = async () => {
		await instance.get(`order/${route.params?.id}`).then((response) => {
			setData(response.data);
			if (response.data?.accepted[0]?.user !== undefined) {
				handleGetUserPhone(response.data?.accepted[0]?.user);
			}
			setLoad(false);
		}).catch((error) => {
			if(error.response?.status === 400){
				ToastErrorMessage("Une erreur s'est produite lors de la récupération.")
			}
			setLoad(false);
		});
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
								onPress={() => makePhoneCall(userphone)}
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
							<Text style={[styles.inputLabel, { fontWeight: 500 }]}>
								À transporter
							</Text>
							{
								<Image
									source={FChoiceProd(data.product)}
									style={{ width: 60, height: 60,  }}
								/>
							}
						</View>

						<View style={{ flexDirection: "col" }}>
							<Text
								style={[
									styles.inputLabel,
									{
										fontWeight: 500,
									},
								]}
							>
								Lieu de recupération
								<Feather
									name="arrow-up-circle"
									size={24}
									color={COLORS.black_ligth}
									onPress={openGps}
								/>
							</Text>
							<Text style={styles.inputLabel}>{data.departure_place}</Text>
						</View>
						<View style={{ flexDirection: "col" }}>
							<Text style={[styles.inputLabel, { fontWeight: 500 }]}>
								Lieu d'arrivé
								<Feather
									name="arrow-down-circle"
									size={24}
									color={COLORS.black_ligth}
									onPress={openGps}
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
							<Text style={[styles.inputLabel, { fontWeight: 500 }]}>
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
							<Text style={[styles.inputLabel, { fontWeight: 500 }]}>
								Budget prévu
							</Text>
							<Text style={styles.inputLabel}>
								{currencyFormat(data.budget, data.devise)}
							</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								flex: 1,
								justifyContent: "space-between",
							}}
						>
							<Text style={[styles.inputLabel, { fontWeight: 500 }]}>
								Véhicule souhaité
							</Text>
							<Image
								source={FChoiceVehicule(data.vehicule)}
								style={{ width: 60, height: 60 }}
							/>
						</View>

						{data.message && (<View style={{ flexDirection: "col" }}>
							<Text style={[styles.inputLabel, { fontWeight: 500 }]}>
								Message
							</Text>
							<Text style={styles.inputLabel}>{data.message}</Text>
						</View>)}

						<View
							style={{
								flexDirection: "row",
								flex: 1,
								justifyContent: "space-between",
							}}
						>
							<Text style={[styles.inputLabel, { fontWeight: 500 }]}>
								Date de publication
							</Text>
							<Text>
								{moment(data.updated_at).startOf("minutes").fromNow()}
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
						<Button
							buttontext="Supprimer"
							style3={styles.stylecallbuttontext}
							style2={styles.styledelbuttoncontainer}
							iconcolor="white"
							iconname="trash"
							iconsize={24}
						/>
						<Button
							buttontext="Modifier"
							style3={styles.stylecallbuttontext}
							style2={styles.styleupdatebuttoncontainer}
							iconcolor="white"
							iconname="edit"
							iconsize={24}
						/>
						<Button
							buttontext="Republier"
							style3={styles.stylecallbuttontext}
							style2={styles.stylepubbuttoncontainer}
							imgicon={icons.retwitw}
							style5={{ height: 27, width: 25 }}
						/>
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
		paddingHorizontal: 20,
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
		paddingHorizontal: 2,
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
		paddingHorizontal: 2,
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
		paddingHorizontal: 2,
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
