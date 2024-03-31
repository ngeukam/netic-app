import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import moment from "moment";
import { COLORS } from "../constants";
import ProgressiveImage from "./ProgressiveImage";
import SwButton from "./SwipeButton";
import FChoiceProd from "../utils/FChoiceProd";
import FChoiceVehicule from "../utils/FChoiceVehicule";
import currencyFormat from "../utils/CurrencyFormat";
export const CARDHEIGHT = 330;
export const PADDING_HORIZONTAL = 80;
const ListItem = ({
	id,
	reference,
	product,
	departure_place,
	arrival_place,
	quantity,
	vehicule,
	budget,
	devise,
	updated_at,
	message,
}) => {
	return (
		<View style={styles.container}>
			{/* PRODUCT AND ADDRESS CONTAINER */}
			<View style={styles.proadd_container}>
				<View style={styles.product}>
					<ProgressiveImage
						defaultImageSource={require("../../assets/images/default_img.png")}
						style={styles.headerImg}
						source={(uri = FChoiceProd(product))}
					/>
					<Text style={{ fontSize: 12, marginRight: 15 }}>{reference} </Text>
				</View>
				<View style={styles.address}>
					<Text numberOfLines={1} style={{ fontSize: 16 }}>
						De {departure_place}{" "}
					</Text>
					<Text numberOfLines={1} style={{ fontSize: 16 }}>
						À {arrival_place}{" "}
					</Text>
				</View>
			</View>
			{/* END PRODUCT AND ADDRESS CONTAINER */}

			{/* QUANTITY, PRICE AND VEHICULE CONTAINER */}
			<View style={styles.budget_vehicule_container}>
				<View style={styles.qty_price}>
					<Text numberOfLines={1} style={{ fontSize: 16 }}>
						Qté/Nbr: {quantity}{" "}
					</Text>
					<Text
						numberOfLines={1}
						style={{
							fontSize: 17,
							fontWeight: "700",
							color: COLORS.black_ligth,
						}}
					>
						{currencyFormat(budget, devise )}
					</Text>
				</View>
				<View style={styles.vehicule}>
					<Image
						source={FChoiceVehicule(vehicule)}
						style={{ width: 80, height: 70 }}
					/>
				</View>
				<Text style={{ fontSize: 14, marginRight: 5 }}>
					  {moment(updated_at).local().startOf('minutes').fromNow()}
				</Text>
			</View>
			{/* MESSAGE CONTAINER */}

			<View style={styles.message}>
				<Text numberOfLines={2} style={{ fontSize: 15 }}>
					{message}{" "}
				</Text>
			</View>

			{/* END QUANTITY, PRICE AND VEHICULE CONTAINER */}
			<SwButton id={id} reference={reference} />
		</View>
	);
};

export default ListItem;
const styles = StyleSheet.create({
	headerImg: {
		borderRadius: 5,
		width: 75,
		height: 70,
	},
	container: {
		backgroundColor: COLORS.blue_light,
		justifyContent: "center",
		paddingHorizontal: PADDING_HORIZONTAL,
		paddingVertical: 5,
		height: CARDHEIGHT,
		flex: 1,
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		shadowOffset: {
			height: 0,
			width: 1,
		},
		elevation: 2,
		borderRadius: 13,
	},
	proadd_container: {
		flexDirection: "row",
		position: "absolute",
		top: 0,
		margin: 5,
		left: 0,
	},
	product: {
		flexDirection: "column",
		alignItems: "center",
	},
	address: {
		marginRight: -PADDING_HORIZONTAL + 5,
		rowGap: 30,
	},
	qty_price: {
		rowGap: 35,
		marginLeft: 5,
	},
	vehicule: { },

	budget_vehicule_container: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		left: 0,
		justifyContent: "space-between",
	},
	message: {
		position: "absolute",
		right: 0,
		left: 0,
		bottom: 80,
		margin: 5,
	},
});
