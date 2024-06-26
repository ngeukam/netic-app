import { View, Text, StyleSheet } from "react-native";
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
		

	},

});
export default Header2;
