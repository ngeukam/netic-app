import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { images, COLORS } from "../constants";

const SplashScreen = () => {
	const { navigate } = useNavigation();
	  setTimeout(() => {
	    navigate("Main");
	  }, 3000);
	return (
		<View style={styles.container}>
			<View style={{}}>
				<LottieView
					style={{
						width: 300,
						height: 180,
					}}
					source={images.delivery_anim}
					autoPlay
					loop
				/>
			</View>
			<View style={{ flex: 1 }}>
				<LottieView
					style={{
						width: 300,
						height: 200,
					}}
					source={images.taxi_anim}
					autoPlay
					loop
				/>
			</View>
			<Text
				style={{
					fontSize: 30,
					textAlign: "center",
					fontWeight: "800",
					color: COLORS.blue,
				}}
			>
				Welcome to NET
				
                <Text
					style={{
						fontSize: 30,
						textAlign: "center",
						fontWeight: "800",
						color: COLORS.red,
					}}
				>
					IC
				</Text>
			</Text>

			<View style={{}}>
				<LottieView
					style={{
						width: 300,
						height: 250,
					}}
					source={images.truck_anim}
					autoPlay
					loop
				/>
			</View>

			{/* <Text>NETIC</Text> */}
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		paddingHorizontal: 20,
		backgroundColor: COLORS.white,
		justifyContent: "space-around",
		flexDirection: "col",
		zIndex: 0,
	},
});
