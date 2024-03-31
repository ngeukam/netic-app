import {
	StyleSheet,
	SafeAreaView,
	RefreshControl,
	ActivityIndicator,
	FlatList,
	View,
	Platform,
} from "react-native";
import BottomSheet from "../components/BottomSheet";
import React, { useRef, useCallback, useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { useScrollToTop } from "@react-navigation/native";
import DownloadItem from "../components/DownloadItem";
import { instance } from "../../config";
import { useIsFocused } from "@react-navigation/native";
const Home = () => {
	const isfocused = useIsFocused();
	const [data, setData] = useState([]);
	const dataLoader = new Array(3).fill(0).map((_, index) => ({ id: index }));
	const [load, setLoad] = useState(true);
	const [loadMore, setLoadMore] = useState(true);
	const [showLoader, setShowLoader] = useState(true);
	const [offset, setOffset] = useState(0);
	const [refreshing, setRefreshing] = useState(false);
	const refRBSheet = useRef();
	const ref = useRef(null);
	let limit = 5;
	useScrollToTop(ref);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		handleGetAllOders();
		setTimeout(() => {
			setRefreshing(false);
		}, 5000);
	}, []);

	useEffect(() => {
		setLoadMore(true);
		handleGetAllOders();
	}, []);

	const handleGetAllOders = async () => {
		setLoadMore(true);
		let query = `?l=${limit}&o=${offset}`;
		await instance
			.get(`order-list/` + query)
			.then((response) => {
				setData([...data, ...response.data?.results]);
				if (response.data?.results.length == 0) {
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
				<ListItem
					id={item?.id}
					reference={item?.reference}
					product={item?.product}
					departure_place={item?.departure_place}
					arrival_place={item?.arrival_place}
					quantity={item?.quantity}
					budget={item?.budget}
					devise={item?.devise}
					updated_at={item?.updated_at}
					vehicule={item?.vehicule}
					message={item?.message}
				/>
			);
		},
		[data]
	);

	const keyExtractor = useCallback((item) => `${item.id}`);

	const onEndReached = () => {
		if (loadMore) {
			handleGetAllOders();
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

	if (load) {
		return (
			<SafeAreaView style={styles.container}>
				<Header
					title="Les jobs pour vous"
					onPress={() => refRBSheet.current.open()}
				/>
				<FlatList
					data={dataLoader}
					keyExtractor={keyExtractor}
					renderItem={() => {
						return <DownloadItem />;
					}}
				/>

				<BottomSheet bottomSheetRef={refRBSheet} />
			</SafeAreaView>
		);
	} else if (!load & (data.length == 0)) {
		return (
			<SafeAreaView style={styles.container}>
				<Header
					title="Les jobs pour vous"
					onPress={() => refRBSheet.current.open()}
				/>
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<Ionicons name="cart-outline" size={100} color={COLORS.gray} />
				</View>
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<Header
					title="Les jobs pour vous"
					onPress={() => refRBSheet.current.open()}
				/>
				<FlatList
					data={data}
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

				<BottomSheet bottomSheetRef={refRBSheet} />
			</SafeAreaView>
		);
	}
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
