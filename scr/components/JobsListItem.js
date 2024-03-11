import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { COLORS, images } from "../constants";
import ProgressiveImage from "./ProgressiveImage";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const JobsListItem = () => {
	const navigation = useNavigation();
	return (
		<View
			style={{
				backgroundColor: COLORS.gray,
				justifyContent: "center",
				paddingHorizontal: 80,
				borderRadius: 10,
				height: 112,
				marginBottom: 5,
				margin: 10,
				flex: 1,
				flexDirection: "row",
				justifyContent: "space-between",
				paddingLeft: 10,
				paddingRight: 10,
				shadowColor: "black",
				shadowOpacity: 0.2,
				shadowRadius:1.41,
				shadowOffset: {
					height: 0,
					width: 1,
				},
				elevation: 2,
			}}
		>
			<View
				style={{
					flexDirection: "column",
					flex: 1,
					justifyContent: "center",
				}}
			>
				<ProgressiveImage
					defaultImageSource={require("../../assets/images/default_img.png")}
					resizeMode="cover"
					style={styles.headerImg}
					source={images.carton}
				/>
			</View>
			<View
				style={{
					flexDirection: "column",
					flex: 1,
					justifyContent: "center",
					rowGap: 2,
				}}
			>
				<Text
					style={{ color: COLORS.black_ligth, fontWeight: 400, fontSize: 15 }}
				>
					De
				</Text>
				<Text
					style={{ color: COLORS.black_ligth, fontWeight: 400, fontSize: 15 }}
				>
					Akwa...
				</Text>
				<Text
					style={{ color: COLORS.black_ligth, fontWeight: 400, fontSize: 15 }}
				>
					À
				</Text>
				<Text
					style={{ color: COLORS.black_ligth, fontWeight: 400, fontSize: 15 }}
				>
					Bonamousa...
				</Text>
                <Text
					style={{ color: COLORS.black_ligth, fontWeight: 400, fontSize: 12 }}
				>
					Aujourd'hui...
				</Text>
			</View>
			<View
				style={{
					flexDirection: "column",
					flex: 1,
					justifyContent: "center",
					rowGap: 10,
				}}
			>
				<Pressable style={{ flexDirection: "row", justifyContent: "flex-start" }} onPress={() => navigation.navigate('Details')}>
					<Ionicons name="eye" size={23} color={COLORS.black_ligth} />
					<Text
						style={{ color: COLORS.black_ligth, fontWeight: 400, fontSize: 15 }}
					>
						Détails
					</Text>
				</Pressable>
				<Text
					style={{
						fontWeight: 500,
						color: COLORS.blue,
						fontSize: 15,
					}}
				>
					10 000 xaf
				</Text>
				<Text
					style={{ color: COLORS.black_ligth, fontWeight: 400, fontSize: 15 }}
				>
					Ref: CUJDLJUE
				</Text>
			</View>
		</View>
	);
};

export default JobsListItem;
const styles = StyleSheet.create({
	headerImg: {
		borderRadius: 5,
		width: 70,
		height: 70,
	},
});
