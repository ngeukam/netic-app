import {
	StyleSheet,
	FlatList,
	SafeAreaView,
	Animated,
	RefreshControl,
	Platform,
	View,
} from "react-native";
import BottomSheet from "../components/BottomSheet";
import React, { useRef, useCallback, useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import { COLORS } from "../constants";
import Header from "../components/Header";
import { CARDHEIGHT } from "../components/ListItem";
import DownloadItem from "../components/DownloadItem";

const Home = () => {
	const data = new Array(50).fill(0).map((_, index) => ({ id: index }));
	const refRBSheet = useRef();

	const [refreshing, setRefreshing] = useState(false);
	const [skip, setSkip] = useState(0);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);
	const renderItem = useCallback(({}) => {
		return <ListItem />;
	});
	const keyExtractor = useCallback((item) => `${item.id}`);

	const onEndReached = () => {};

	return (
		<SafeAreaView style={styles.container}>
			<Header
				title="Les jobs pour vous"
				onPress={() => refRBSheet.current.open()}
			/>
			<Animated.FlatList
				data={data}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={[COLORS.blue, COLORS.black_ligth]}
					/>
				}
				onEndReached={onEndReached}
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
		paddingTop: 20,
		borderBottomWidth: 55,
		borderBottomColor: "transparent",
	},
});
