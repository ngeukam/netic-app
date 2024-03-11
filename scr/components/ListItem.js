import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
	Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, icons, images } from "../constants";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import ProgressiveImage from "./ProgressiveImage";
import { useIsFocused } from "@react-navigation/native";
import SwButton from "./SwipeButton";

export const CARDHEIGHT = 290;
const ListItem = () => {
	const [visible, setVisible] = useState(false);
	const [pressed, setPressed] = useState(false);

	const focused = useIsFocused();

	useEffect(() => {
		setVisible(false);
	}, [focused]);

	return (
		<View
			style={{
				backgroundColor: COLORS.blue_light,
				justifyContent: "center",
				paddingHorizontal: 80,
				marginVertical: 12,
				borderRadius: 10,
				height: visible ? CARDHEIGHT + 140 : CARDHEIGHT,
				// marginBottom: 5,
				margin: 10,
				flex: 1,
				shadowColor: "black",
				shadowOpacity: 0.2,
				shadowRadius: 1.41,
				shadowOffset: {
					height: 0,
					width: 1,
				},
				elevation: 2,
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
				<ProgressiveImage
					defaultImageSource={require("../../assets/images/default_img.png")}
					resizeMode="cover"
					style={styles.headerImg}
					source={images.carton}
				/>
				<View style={{ flexDirection: "column" }}>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "400",
							color: COLORS.black_ligth,
						}}
					>
						Ref: CUJDLJUE
					</Text>
				</View>
			</View>
			{/* SECOND ROW */}
			<View
				style={{
					flexDirection: "row",
					// flex: 1,
					justifyContent: "center",
					marginRight: -60,
					marginLeft: -60,
					paddingLeft: 5,
					paddingRight: 5,
					alignContent: "center",
				}}
			>
				{/* FIRST COLUMN */}
				<View
					style={{
						flexDirection: "column",
						flex: 1,
						rowGap: 30,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							// flex: 1,
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
									color: COLORS.black_ligth,
								}}
							>
								De
							</Text>
							<Text
								style={{
									fontSize: 17,
									fontWeight: "500",
									color: COLORS.black_ligth,
								}}
							>
								Akwaazert...
							</Text>
						</View>
					</View>

					<View
						style={{
							flexDirection: "row",
							// flex: 1,
						}}
					>
						<Text
							style={{
								fontSize: 17,
								fontWeight: "500",
								color: COLORS.black_ligth,
							}}
						>
							Qté: 10
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							// flex: 1,
						}}
					>
						<Text
							style={{
								fontSize: 17,
								fontWeight: "500",
								color: COLORS.black_ligth,
							}}
						>
							10 000 xaf
						</Text>
					</View>
					{visible ? (
						<View
							style={{
								flexDirection: "row",
								// flex: 1,
							}}
						>
							<Text
								style={{
									fontSize: 17,
									fontWeight: "400",
									color: COLORS.black_ligth,
								}}
							>
								date recup: 09.03.2024
							</Text>
						</View>
					) : (
						<></>
					)}
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
							// paddingBottom: 20,
							// flex: 1,
							alignContent: "center",
							justifyContent: "center",
						}}
					>
						<Ionicons
							name="arrow-forward-outline"
							size={30}
							color={COLORS.black_ligth}
						/>
					</View>
				</View>
				{/* THIRD COMLUN */}
				<View
					style={{
						flexDirection: "column",
						flex: 1,
						rowGap: 30,
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
								// flex: 1,
							}}
						>
							<Text
								style={{
									fontSize: 15,
									fontWeight: "500",
									color: COLORS.black_ligth,
									// flex: 1,
								}}
							>
								À
							</Text>
							<Text
								style={{
									fontSize: 17,
									fontWeight: "500",
									color: COLORS.black_ligth,
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
							flex: 1,
							alignContent:'center',
							alignItems:'center'
						}}
					>
						{/* <Ionicons name="car" size={30} color={COLORS.black_ligth} /> */}
						<Image
							source={uri=images.taxi}
							resizeMode="contain"
							style={{width:80, height:80 }}
						/>
					</View>

					<View
						style={{
							flexDirection: "row",
							// justifyContent: "space-between",
							// flex: 1,
						}}
					>
						<Pressable
							onPress={() => setVisible(!visible)}
							onPressIn={() => setPressed(true)}
							onPressOut={() => setPressed(false)}
							// style={pressed ? styles.pressed : {}}
						>
							<Text
								style={{
									fontSize: 15,
									fontWeight: "500",
									color: pressed ? COLORS.red : COLORS.black_ligth,
									// textDecorationLine: "underline",
								}}
							>
								{visible ? "Moins d'infos" : "Plus d'infos"}
							</Text>
						</Pressable>
					</View>
					{visible ? (
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<Text
								style={{
									fontSize: 17,
									fontWeight: "400",
									color: COLORS.black_ligth,
									// flex: 1,
									// marginLeft: -40,
								}}
							>
								Date liv: 09.03.2024
							</Text>
						</View>
					) : (
						<></>
					)}
				</View>
			</View>
			{/* THIRD ROW */}
			{visible ? (
				<View
					style={{
						flexDirection: "row",
						marginRight: -60,
						marginLeft: -60,
						paddingLeft: 5,
						paddingTop: 10,
					}}
				>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "400",
							color: COLORS.black_ligth,
						}}
					>
						C'est un colis très léger, il faut aller doucement avec.
					</Text>
				</View>
			) : (
				<></>
			)}
			<View
				style={{
					flexDirection: "row",
					alignContent: "center",
					justifyContent: "center",
					paddingTop: 5,
				}}
			>
				<SwButton />
			</View>
		</View>
	);
};

export default ListItem;
const styles = StyleSheet.create({
	headerImg: {
		borderRadius: 5,
		width: 70,
		height: 70,
	},
});
