import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./scr/navigation/AppNavigation";

const App = () => {
	return (
		<AppNavigation />
		// <View style={styles.container}>

		// </View>
	);
};
export default App;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
