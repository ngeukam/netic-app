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
import React, { useRef, useCallback, useState } from "react";
import ListItem from "../components/ListItem";
import { COLORS } from "../constants";
import Header from "../components/Header";
import { CARDHEIGHT } from "../components/ListItem";
import DownloadItem from "../components/DownloadItem";

const Home = () => {
	const data = new Array(10).fill(0).map((_, index) => ({ id: index }));
	const refRBSheet = useRef();
	const scrollY = new Animated.Value(0);
	// const diffClamp = Animated.diffClamp(scrollY, 0, CARDHEIGHT);
	// const translateY = diffClamp.interpolate({
	// 	inputRange: [0, CARDHEIGHT],
	// 	outputRange: [0, -CARDHEIGHT],
	// });
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

	const onEndReached = () => {
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* <Animated.View
				style={{
					transform: [{ translateY: translateY }],
					elevation: 4,
					zIndex: 100,
				}}
			> */}
			<Header
				title="Les jobs pour vous"
				onPress={() => refRBSheet.current.open()}
			/>
			<FlatList
				data={data}
				keyExtractor={keyExtractor}
				renderItem={
					// const inputRange = [
					// 	-1,
					// 	0,
					// 	CARDHEIGHT * index,
					// 	CARDHEIGHT * (index + 2),
					// ];
					// const opacityInputRange = [
					// 	-1,
					// 	0,
					// 	CARDHEIGHT * index,
					// 	CARDHEIGHT * (index + .5),
					// ];
					// const scale = scrollY.interpolate({
					// 	inputRange,
					// 	outputRange: [1, 1, 1, 0],
					// });
					// const opacity = scrollY.interpolate({
					// 	inputRange:opacityInputRange,
					// 	outputRange: [1, 1, 1, 0],
					// });
					renderItem
				}
				// onScroll={(e) => {
				// 	scrollY.setValue(e.nativeEvent.contentOffset.y);
				// }}
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
		backgroundColor: COLORS.gray,
		paddingTop: 20,
	},
});
