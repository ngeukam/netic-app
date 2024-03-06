import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import React, { useRef } from "react";
import ListItem from "../components/ListItem";
import { COLORS } from "../constants";
import Header from "../components/Header";
import BottomSheet from "../components/BottomSheet";

const Home = () => {
	const data = new Array(50).fill(0).map((_, index) => ({ id: index }));
	const refRBSheet = useRef();
	return (
		<SafeAreaView style={styles.container}>
			<Header onPress={() => refRBSheet.current.open()} />
			<FlatList
				data={data}
				keyExtractor={(item) => `key-${item.id}`}
				renderItem={() => <ListItem />}
			/>
			<BottomSheet bottomSheetRef={refRBSheet} />
		</SafeAreaView>
	);
};
export default Home;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		paddingTop: 30,
	},
});
