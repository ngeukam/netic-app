import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const Header2 = ({ title }) => {

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				
				<Text
					style={{
						marginLeft: 12,
						fontSize: 20,
						fontWeight: "bold",
					}}
				>
					{title}
				</Text>
			</View>
			
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingVertical:10,
		backgroundColor: COLORS.white,
		// flex:1,
		// justifyContent:'center'

	},

});
export default Header2;
