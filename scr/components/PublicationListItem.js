import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import moment from "moment";
import { COLORS } from "../constants";
import ProgressiveImage from "./ProgressiveImage";
import { useNavigation } from "@react-navigation/native";
import FChoiceProd from "../utils/FChoiceProd";
import currencyFormat from "../utils/CurrencyFormat";
export const CARDHEIGHT_J = 130;
export const PADDING_HORIZONTAL_J = 80;
const PublicationListItem = ({
	id,
	product,
	reference,
	departure_place,
	arrival_place,
	budget,
	devise,
	job_status,
	updated_at,
}) => {
	const navigation = useNavigation();
	return (
		<Pressable
			onPress={() => navigation.navigate("Details", { ref: reference, id:id })}
			style={styles.container}
		>
			{/* PRODUCT AND ADDRESS CONTAINER */}
			<View style={styles.proadd_container}>
				<View style={styles.product}>
					<ProgressiveImage
						defaultImageSource={require("../../assets/images/default_img.png")}
						style={styles.headerImg}
						source={(uri = FChoiceProd(product))}
					/>
					<Text style={{ fontSize: 11, marginRight: 15 }}> {reference}</Text>
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
			{/* PRICE, COM, DATE */}
			<View style={styles.job_container}>

				{job_status ? (
					<Text style={styles.jobstatus1}>Job</Text>
				) : (
					<Text style={styles.jobstatus2}>Job</Text>
				)}

				<Text
					numberOfLines={1}
					style={{
						fontSize: 15,
						fontWeight: "500",
						color: COLORS.black_ligth,
					}}
				>
					{currencyFormat(budget, devise)}
				</Text>

				<View style={styles.date}>
					<Text
						style={{
							fontSize: 14,
						}}
					>
						{moment(updated_at).startOf("minutes").fromNow()}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default PublicationListItem;
const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.blue_light,
		justifyContent: "center",
		borderRadius: 13,
		height: CARDHEIGHT_J,
		paddingHorizontal: PADDING_HORIZONTAL_J,
		// margin: 5,
		flex: 1,
		flexDirection: "row",
		padding: 10,
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		shadowOffset: {
			height: 0,
			width: 1,
		},
		elevation: 2,
	},
	headerImg: {
		borderRadius: 5,
		width: 70,
		height: 70,
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
		marginRight: -PADDING_HORIZONTAL_J + 5,
		rowGap: 30,
	},
	job_container: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		left: 0,
		justifyContent: "space-between",
		top: CARDHEIGHT_J - 30,
		margin: 5,
	},
	jobstatus1: {
		borderRadius: 5,
		backgroundColor: COLORS.blue,
		width: 30,
		height: 20,
		textAlign: "center",
		fontWeight: "500",
		color: COLORS.white,
		fontSize: 15,
	},
	jobstatus2: {
		borderRadius: 5,
		backgroundColor: COLORS.red,
		width: 30,
		height: 20,
		textAlign: "center",
		fontWeight: "500",
		color: COLORS.white,
		fontSize: 15,
	},
});
