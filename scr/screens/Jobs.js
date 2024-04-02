import {
	View,
	StyleSheet,
	FlatList,
	SafeAreaView,
	RefreshControl,
	ActivityIndicator,
	Platform,
} from "react-native";
import React, { useRef, useState, useCallback } from "react";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import BottomSheet from "../components/BottomSheet";
import JobsListItem from "../components/JobsListItem";
import { useScrollToTop, useFocusEffect } from "@react-navigation/native";
import { instance } from "../../config";
const Jobs = () => {
	// const isfocused = useIsFocused();
	const refRBSheet = useRef();
	const [refreshing, setRefreshing] = useState(false);
	const [data, setData] = useState([]);
	const [load, setLoad] = useState(true);
	const [loadMore, setLoadMore] = useState(true);
	const [showLoader, setShowLoader] = useState(true);
	const [offset, setOffset] = useState(0);
	const ref = useRef(null);
	let limit = 5;
	useScrollToTop(ref);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		handleGetAllUserPublications();
		setTimeout(() => {
			setRefreshing(false);
		}, 5000);
	}, []);

	useFocusEffect(
		useCallback(() => {
			setLoadMore(true);
			handleGetAllUserPublications();
		}, [])
	);
	const handleGetAllUserPublications = async () => {
		setLoadMore(true);
		let query = `?l=${limit}&o=${offset}`;
		await instance
			.get(`job-list/` + query)
			.then((response) => {
				setData([...data, ...response.data?.results]);
				if (response.data?.results?.length == 0) {
					setOffset(offset);
					setLoadMore(false);
				} else {
					setOffset(offset + 5);
				}
			})
			.finally(() => {
				setShowLoader(false);
				setLoad(false);
			});
	};
	const _renderItem = useCallback(
		({ item }) => {
			return (
				<JobsListItem
					id={item?.order?.id}
					departure_place={item?.order?.departure_place}
					arrival_place={item?.order?.arrival_place}
					product={item?.order?.product}
					budget={item?.order?.budget}
					devise={item?.order?.devise}
					paid_amount={item?.order?.paid_amount}
					reference={item?.order?.reference}
					updated_at={item?.accepted_at}
				/>
			);
		},
		[data]
	);
	const keyExtractor = useCallback((item) => `${item?.order?.id}`);

	const onEndReached = () => {
		if (loadMore) {
			handleGetAllUserPublications();
			setShowLoader(true);
		}
	};
	const itemSeparator = useCallback(() => {
		return <View style={{ height: Platform.OS === "ios" ? 20 : 10 }} />;
	}, [data]);
	const listFooterComponent = () => {
		return (
			<ActivityIndicator
				style={{ marginVertical: 32 }}
				color={COLORS.blue}
				size={"large"}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header title="Mes Jobs" onPress={() => refRBSheet.current.open()} />
			{load ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<ActivityIndicator size={"large"} color={COLORS.blue} />
				</View>
			) : data.length == 0 ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<Ionicons name="cart" size={100} color={COLORS.gray} />
				</View>
			) : (
				<FlatList
					data={data}
					extraData={data}
					keyExtractor={keyExtractor}
					renderItem={_renderItem}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
							colors={[COLORS.blue, COLORS.black_ligth]}
						/>
					}
					onEndReached={onEndReached}
					ItemSeparatorComponent={itemSeparator}
					ref={ref}
					ListFooterComponent={showLoader && listFooterComponent}
				/>
			)}

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
