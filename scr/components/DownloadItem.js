import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../constants";
import { CARDHEIGHT } from "./ListItem";
import { PADDING_HORIZONTAL } from "./ListItem";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const DownloadItem = () => {
	return (
		<View style={styles.container}>
			{/* PRODUCT AND ADDRESS CONTAINER */}
			<View style={styles.proadd_container}>
				<View style={styles.product}>
					<ShimmerPlaceHolder
						style={{ width: 70, height: 50 }}
						shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
					></ShimmerPlaceHolder>
					<ShimmerPlaceHolder
						style={{ width: 60, height: 15 }}
						shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
					></ShimmerPlaceHolder>
				</View>
				<View style={styles.address}>
					<ShimmerPlaceHolder
						style={{ width: 250, height: 15 }}
						shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
					></ShimmerPlaceHolder>
					<ShimmerPlaceHolder
						style={{ width: 250, height: 15 }}
						shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
					></ShimmerPlaceHolder>
				</View>
			</View>
			{/* END PRODUCT AND ADDRESS CONTAINER */}

			{/* QUANTITY, PRICE AND VEHICULE CONTAINER */}
			<View style={styles.budget_vehicule_container}>
				<View style={styles.qty_price}>
					<ShimmerPlaceHolder
						style={{ width: 120, height: 15 }}
						shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
					></ShimmerPlaceHolder>
					<ShimmerPlaceHolder
						style={{ width: 120, height: 15 }}
						shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
					></ShimmerPlaceHolder>
				</View>
				<View style={styles.vehicule}>
					<ShimmerPlaceHolder
						style={{ width: 70, height: 50 }}
						shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
					></ShimmerPlaceHolder>
				</View>
				<ShimmerPlaceHolder
					style={{ width: 100, height: 15 }}
					shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
				></ShimmerPlaceHolder>
			</View>
			{/* MESSAGE CONTAINER */}

			<View style={styles.message}>
				<ShimmerPlaceHolder
					style={{ width: 400, height: 40 }}
					shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
				></ShimmerPlaceHolder>
			</View>

			{/* END QUANTITY, PRICE AND VEHICULE CONTAINER */}
			<View style={styles.button}>
				<ShimmerPlaceHolder
					style={{ width: 300, height: 50 }}
					shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
				></ShimmerPlaceHolder>
			</View>
		</View>
	);
};

export default DownloadItem;
const styles = StyleSheet.create({
	headerImg: {
		borderRadius: 5,
		width: 75,
		height: 70,
	},
	container: {
		backgroundColor: COLORS.gray,
		justifyContent: "center",
		paddingHorizontal: PADDING_HORIZONTAL,
		paddingVertical: 5,
		height: CARDHEIGHT,
		marginBottom: 10,
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
		rowGap:3
	},
	address: {
		marginRight: -PADDING_HORIZONTAL + 5,
		rowGap: 30,
	},
	qty_price: {
		rowGap: 35,
		marginLeft: 5,
	},
	vehicule: {},

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
		bottom: 60,
		margin: 5,
	},
	button: {
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "center",
		left: 0,
		right: 0,
		top: 130,
	},
});
