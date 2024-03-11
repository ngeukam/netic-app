import {
	View,
	Text,
	StyleSheet,
	FlatList,
	SafeAreaView,
	RefreshControl,
} from "react-native";
import React, { useRef, useState, useCallback } from "react";
import { COLORS } from "../constants";
import Header from "../components/Header";
import BottomSheet from "../components/BottomSheet";
import JobsListItem from "../components/JobsListItem";
const Jobs = () => {
	const refRBSheet = useRef();
	const data = new Array(20).fill(0).map((_, index) => ({ id: index }));
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);
	const renderItem = useCallback(({}) => {
		return <JobsListItem />;
	})
	const keyExtractor = useCallback((item) => `${item.id}`)

	const onEndReached = () => {
		alert('stop')
	}
	return (
		<SafeAreaView style={styles.container}>
			<Header title="Mes Jobs" onPress={() => refRBSheet.current.open()} />
			<FlatList
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
			/>

			<BottomSheet bottomSheetRef={refRBSheet} />
		</SafeAreaView>
	);
};

export default Jobs;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		paddingTop: 20,
	},
});
