import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Platform,
	Linking,
	Image,
} from "react-native";
import React from "react";
import { COLORS, icons, images } from "../constants";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";

const Details = () => {
	const makePhoneCall = () => {
		if (Platform.OS === "android") {
			Linking.openURL("tel:694048805");
		} else {
			Linking.openURL("tel:694048805");
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
						buttontext="Appelez le coursier"
						style4={styles.stylecallbuttontext}
						style2={styles.stylecallbuttoncontainer}
						iconcolor="white"
						iconname="phone-call"
						iconsize={24}
						onPress={makePhoneCall}
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
						<Text style={[styles.inputLabel, { fontWeight: 500 }]}>
							À transporter
						</Text>
						<Image
							source={(uri = images.carton)}
							style={{ width: 60, height: 50 }}
						/>
					</View>

					<View style={{ flexDirection: "col" }}>
						<Text
							style={[
								styles.inputLabel,
								{
									fontWeight: 500,
									// flexDirection: "row",
								},
							]}
						>
							Lieu de recupération
							<Feather
								name="map-pin"
								size={24}
								color={COLORS.blue}
								onPress={openGps}
							/>
							<Text
								style={{ fontStyle: "italic", fontSize: 12, color: COLORS.blue }}
							>
								Lancez la géolocation
							</Text>
						</Text>
						<Text style={styles.inputLabel}>
							Akwa tttttttttjj hhhh ààoooooooooooooooooooooooooooooooooooooo
						</Text>
					</View>
					<View style={{ flexDirection: "col" }}>
						<Text style={[styles.inputLabel, { fontWeight: 500 }]}>
							Lieu d'arrivé
							<Feather
								name="map-pin"
								size={24}
								color={COLORS.red}
								onPress={openGps}
							/>
							<Text
								style={{ fontStyle: "italic", fontSize: 12, color: COLORS.red }}
							>
								Lancez la géolocation
							</Text>
						</Text>
						<Text style={styles.inputLabel}>Bonamoussadi kkkkk j</Text>
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
						<Text style={styles.inputLabel}>100</Text>
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
						<Text style={styles.inputLabel}>1 500 xaf</Text>
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
							source={(uri = images.tricycle)}
							style={{ width: 60, height: 50 }}
						/>
					</View>

					<View style={{ flexDirection: "col" }}>
						<Text style={[styles.inputLabel, { fontWeight: 500 }]}>
							Message
						</Text>
						<Text style={styles.inputLabel}>
							Akwa tttttttttjj hhhh ààoooooooooooooooooooooooooooooooooooooo
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
						style4={styles.stylecallbuttontext}
						style2={styles.styledelbuttoncontainer}
						iconcolor="white"
						iconname="trash"
						iconsize={24}
					/>
					<Button
						buttontext="Modifier"
						style4={styles.stylecallbuttontext}
						style2={styles.styleupdatebuttoncontainer}
						iconcolor="white"
						iconname="edit"
						iconsize={24}
					/>
					<Button
						buttontext="Republier"
						style4={styles.stylecallbuttontext}
						style2={styles.stylepubbuttoncontainer}
						iconcolor="white"
						iconname="arrow-up"
						iconsize={24}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
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
		paddingVertical: 4,
		paddingHorizontal: 5,
		borderWidth: 1,
		backgroundColor: COLORS.red,
		borderColor: COLORS.red,
	},
	styleupdatebuttoncontainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 4,
		paddingHorizontal: 5,
		borderWidth: 1,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
	},
	stylepubbuttoncontainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 4,
		paddingHorizontal: 5,
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
