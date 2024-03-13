import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

const MapViewCard = () => {
	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 3.844119,
					longitude: 11.501346,
					latitudeDelta: 2,
					longitudeDelta: 2,
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
		// flex: 1,
	},
	map: {
		width: "100%",
		height: "54%",
	},
});
