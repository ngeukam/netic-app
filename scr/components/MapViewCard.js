import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SIZES } from "../constants";

let HEIGHT_SCREEN = Dimensions.get("window").height;
const MapViewCard = () => {
	const { width, height } = Dimensions.get("window");
	const ASPECT_RATIO = width / height;
	const LATITUDE_DELTA = 0.0922;
	const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 3.844119,
					longitude: 11.501346,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA,
				}}
				provider={PROVIDER_GOOGLE}
				showsUserLocation
				showsMyLocationButton
			/>
		</View>
	);
};

export default MapViewCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "center",
		alignContent: "center",
	},
	map: {
		...Platform.select({
			ios: {
				flex: 1,
			},
			android: {
				// bottom: Dimensions.get("window").height/6,
				// position: "absolute",
				width: Dimensions.get("window").width - 20,
				height: Dimensions.get("window").height,
				// height:300,
			},
		}),
	},
});
