import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants";
import { CARDHEIGHT } from "./ListItem";
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const DownloadItem = () => {
	return (
		<View
			style={{
				backgroundColor: COLORS.gray,
				justifyContent: "center",
				paddingHorizontal: 80,
				borderRadius: 10,
				height: CARDHEIGHT,
				marginBottom: 5,
				margin: 10,
				flex: 1,
			}}
		>
			{/* FIRST ROW */}
			<View
				style={{
					flexDirection: "row",
					// marginBottom: 10,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Image
					source={require("../../assets/images/default_img.png")}
					resizeMode="cover"
					style={styles.headerImg}
				/>
				<View style={{ flexDirection: "column" }}>
					<View style={{ flexDirection: "row", marginBottom: 15 }}>
						<ShimmerPlaceHolder
							style={{
								width: 100,
								height: 17,
							}}
							shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
						></ShimmerPlaceHolder>
					</View>
					<ShimmerPlaceHolder
						style={{
							width: 100,
							height: 15,
						}}
						shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
					></ShimmerPlaceHolder>
				</View>
			</View>
			{/* END FIRST ROW */}

			{/* SECOND ROW */}
			<View
				style={{
					flexDirection: "row",
					// flex: 1,
					justifyContent: "center",
					marginRight: -60,
					marginLeft: -60,
					paddingLeft: 5,
					alignContent: "center",
				}}
			>
				{/* FIRST COLUMN */}
				<View
					style={{
						flexDirection: "column",
						flex: 1,
						rowGap: 35,
					}}
				>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View
							style={{
								justifyContent: "flex-end",
								alignItems: "center",
							}}
						>
							<ShimmerPlaceHolder
								style={{
									width: 100,
									height: 15,
									marginBottom: 5,
								}}
								shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
							></ShimmerPlaceHolder>
							<ShimmerPlaceHolder
								style={{
									width: 100,
									height: 15,
								}}
								shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
							></ShimmerPlaceHolder>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<ShimmerPlaceHolder
							style={{
								width: 100,
								height: 15,
							}}
							shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
						></ShimmerPlaceHolder>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<ShimmerPlaceHolder
							style={{
								width: 100,
								height: 15,
							}}
							shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
						></ShimmerPlaceHolder>
					</View>
				</View>
				{/* END FIRST COLUMN */}
				{/* SECOND COLUMN */}
				<View
					style={{
						flexDirection: "column",
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignContent: "center",
							justifyContent: "center",
						}}
					>
						<Ionicons name="arrow-forward-outline" size={30} color="#c5c5c5" />
					</View>
				</View>
				{/* END SECOND COLUMN */}
				{/* THIRD COLMUN */}
				<View
					style={{
						flexDirection: "column",
						flex: 1,
						rowGap: 32,
					}}
				>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<View
							style={{
								justifyContent: "flex-end",
								alignItems: "center",
							}}
						>
							<ShimmerPlaceHolder
								style={{
									width: 100,
									height: 15,
									marginBottom: 5,
								}}
								shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
							></ShimmerPlaceHolder>
							<ShimmerPlaceHolder
								style={{
									width: 100,
									height: 15,
								}}
								shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
							></ShimmerPlaceHolder>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<ShimmerPlaceHolder
							style={{
								width: 100,
								height: 15,
							}}
							shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
						></ShimmerPlaceHolder>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<ShimmerPlaceHolder
							style={{
								width: 100,
								height: 15,
							}}
							shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
						></ShimmerPlaceHolder>
					</View>
				</View>
				{/* END THIRD COLMUN */}
			</View>
			{/* END SECOND ROW */}
			<View
				style={{
					flexDirection: "row",
					alignContent: "center",
					justifyContent: "center",
					paddingTop: 15,
				}}
			>
				<ShimmerPlaceHolder
					style={{
						width: 250,
						height: 45,
						backgroundColor: COLORS.blue_light,
						borderRadius: 10,
                        justifyContent:'center'
					}}
					shimmerColors={["#ebebeb", "#c5c5c5", "#ebebeb"]}
				>
					
				</ShimmerPlaceHolder>
			</View>
		</View>
	);
};

export default DownloadItem;
const styles = StyleSheet.create({
	headerImg: {
		borderRadius: 10,
		width: 70,
		height: 70,
		marginRight: 10,
	},
});
