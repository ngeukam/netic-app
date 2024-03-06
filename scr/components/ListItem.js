import {
	View,
	Text,
	StyleSheet,
	Image,
	useWindowDimensions,
	Animated,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SwipeButton from "rn-swipe-button";
import arrowRight from "../../assets/images/arrow-right.png";

export const NOTIFICATION_HEIGHT = 300;

const ListItem = () => {
	return (
		<View style={styles.container2}>
			<View
				style={{
					flexDirection: "row",
					marginBottom: 15,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View>
					<Image
						source={require("../../assets/images/carton.jpg")}
						resizeMode="contain"
						style={styles.headerImg}
					/>
				</View>
				<View style={{ flexDirection: "column" }}>
					<View style={{ flexDirection: "row", marginBottom: 15 }}>
						<MaterialCommunityIcons color="#222" name="weight" size={25} />
						<Text
							style={{
								fontSize: 17,
								fontWeight: "500",
								color: "#222",
								flex: 1,
							}}
						>
							100kg
						</Text>
					</View>
					<Text style={{ fontSize: 15, fontWeight: "400", color: "#222" }}>
						Réf: CUJDLJUE
					</Text>
				</View>
			</View>

			<View
				style={{
					flexDirection: "row",
					flex: 1,
					justifyContent: "center",
					marginRight: -80,
					marginLeft: -60,
					paddingLeft: 5,
					alignContent: "center",
				}}
			>
				<View
					style={{
						flexDirection: "column",
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							paddingBottom: 20,
							// justifyContent: "space-between",
							flex: 1,
						}}
					>
						<View
							style={{
								justifyContent: "flex-end",
								alignItems: "center",
								// marginLeft: -40,
							}}
						>
							<Text
								style={{
									fontSize: 15,
									fontWeight: "500",
									color: "#222",
									// flex: 1,
								}}
							>
								De
							</Text>
							<Text
								style={{
									fontSize: 17,
									fontWeight: "500",
									color: "#222",
									// flex: 1,
								}}
							>
								Akwaazert...
							</Text>
						</View>
					</View>

					<View
						style={{
							flexDirection: "row",
							flex: 1,
							// justifyContent: "space-between",
						}}
					>
						<Text
							style={{
								fontSize: 17,
								fontWeight: "400",
								color: "#222",
								// marginLeft: -40,
							}}
						>
							Qté:100
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							// justifyContent: "space-between",
							flex: 1,
						}}
					>
						<Text
							style={{
								fontSize: 17,
								fontWeight: "500",
								color: "#222",
								// flex: 1,
								// marginLeft: -40,
							}}
						>
							10 000 xaf
						</Text>
					</View>
				</View>

				<View
					style={{
						flexDirection: "column",
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							paddingBottom: 20,
							flex: 1,
							alignContent: "center",
							justifyContent: "center",
						}}
					>
						<MaterialCommunityIcons
							color="#222"
							name="arrow-right-bold-outline"
							size={30}
						/>
					</View>
				</View>

				<View
					style={{
						flexDirection: "column",
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							paddingBottom: 20,
							// justifyContent: "space-between",
							flex: 1,
						}}
					>
						<View
							style={{
								justifyContent: "flex-end",
								alignItems: "center",
							}}
						>
							<Text
								style={{
									fontSize: 15,
									fontWeight: "500",
									color: "#222",
									// flex: 1,
								}}
							>
								À
							</Text>
							<Text
								style={{
									fontSize: 17,
									fontWeight: "500",
									color: "#222",
									// flex: 1,
								}}
							>
								Bonaberie...
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							flex: 1,
						}}
					>
						<MaterialCommunityIcons
							color="#222"
							name="car"
							size={30}
							style={{}}
						/>
					</View>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							flex: 1,
						}}
					>
						<Text
							style={{
								fontSize: 15,
								fontWeight: "500",
								color: "#222",
								// fontFamily: "Roboto-Regular",
								textDecorationLine: "underline",
								// marginRight: -80,
							}}
						>
							Plus d'infos
						</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignContent: "center",
					justifyContent: "center",
				}}
			>
				<SwipeButton
					disabled={false}
					//disable the button by doing true (Optional)
					swipeSuccessThreshold={80}
					height={45}
					//height of the button (Optional)
					width={270}
					//width of the button (Optional)
					title="Faire glisser pour accepter"
					titleStyles={{
						fontSize: 15,
						fontWeight: "500",
						color: "#FFF",
						fontStyle: "italic",
						textAlign:'right'
					}}
					//Text inside the button (Optional)
					//thumbIconImageSource={thumbIcon}
					//You can also set your own icon (Optional)
					onSwipeSuccess={() => {
						alert("Submitted Successfully!");
					}} //After the completion of swipe (Optional)
					containerStyles={{
						borderRadius:12
					}}
					railStyles={{
						borderRadius:12
					}}
					thumbIconStyles={{
						borderRadius:10,						
					}}
					thumbIconImageSource={arrowRight}
					railFillBackgroundColor="rgba(0, 0, 0, 0.5)" //(Optional)
					railFillBorderColor="#db5a44" //(Optional)
					thumbIconBackgroundColor="#db5a44" //(Optional)
					thumbIconBorderColor="#db5a44" //(Optional)
					railBackgroundColor="#44c5db" //(Optional)
					railBorderColor="#44c5db" //(Optional)
				/>
			</View>
		</View>
	);
};

export default ListItem;
const styles = StyleSheet.create({
	headerImg: {
		borderRadius: 10,
		width: 70,
		height: 70,
		marginRight: 10,
	},
	container2: {
		backgroundColor: "#c6edf4",
		justifyContent: "center",
		paddingHorizontal: 80,
		borderRadius: 10,
		height: NOTIFICATION_HEIGHT - 10,
		marginBottom: 5,
		margin: 10,
		flex: 1,
		// shadowColor: "#FFF",
		// shadowOpacity: .3,
		// shadowRadius:20,
		// shadowOffset: {
		// 	height: 10,
		// 	width: 0,
		// },
	},
});
