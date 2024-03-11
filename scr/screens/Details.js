import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";

const Details = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ padding: 10 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignContent: "center",
						justifyContent: "center",
					}}
				>
					<Text>details</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Details;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});
