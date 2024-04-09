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
import { useRef, useCallback, useState, useContext } from "react";
import ListItem from "../components/ListItem";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { useScrollToTop, useFocusEffect } from "@react-navigation/native";
import DownloadItem from "../components/DownloadItem";
import { instance } from "../../config";
import { LocationContext } from "../context/LocationContext";

const Home = () => {
	const { location } = useContext(LocationContext);
	const [data, setData] = useState([]);
	const dataLoader = new Array(3).fill(0).map((_, index) => ({ id: index }));
	const [load, setLoad] = useState(true);
	const [loadMore, setLoadMore] = useState(true);
	const [showLoader, setShowLoader] = useState(true);
	const [offset, setOffset] = useState(0);
	const [refreshing, setRefreshing] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [filterdata, setfilterData] = useState([]);
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
	useFocusEffect(
		useCallback(() => {
			setSearchText("");
			setLoadMore(true);
			handleGetAllOders();
		}, [])
	);
	const handleGetAllOders = async () => {
		setLoadMore(true);
		let lat = location?.coords?.latitude;
		let long = location?.coords?.longitude;
		let query1 = `?l=${limit}&o=${offset}`;
		let query2 = `&lat=${lat}&long=${long}`;

		await instance
			.get(`order-list/` + query1 + query2)
			.then((response) => {
				setfilterData([...data, ...response.data?.results]);
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
					created_at={item?.created_at}
					vehicule={item?.vehicule}
					message={item?.message}
				/>
			);
		},
		[filterdata]
	);

	const _keyExtractor = useCallback((item, index) => index);

	const onEndReached = () => {
		if (loadMore) {
			handleGetAllOders();
			setShowLoader(true);
		}
	};
	const itemSeparator = useCallback(() => {
		return <View style={{ height: Platform.OS === "ios" ? 20 : 10 }} />;
	}, [filterdata]);
	const listFooterComponent = () => {
		return (
			<ActivityIndicator
				style={{ marginVertical: 32 }}
				color={COLORS.blue}
				size={"large"}
			/>
		);
	};

	const handlesearchFilter = (text) => {
		if (text) {
			const newData = data.filter((item) => {
				const itemData = item.departure_place
					? item.departure_place.toUpperCase()
					: "".toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setfilterData(newData);
			setSearchText(text);
		} else {
			setfilterData(data);
			setSearchText(text);
		}
	};
	return (
		<SafeAreaView style={styles.container}>
			<Header
				title="Les jobs"
				onChangeText={(text) => handlesearchFilter(text)}
				searchText={searchText}
				onPress={() => refRBSheet.current.open()}
			/>
			{load ? (
				<FlatList
					data={dataLoader}
					keyExtractor={_keyExtractor}
					renderItem={() => {
						return <DownloadItem />;
					}}
				/>
			) : filterdata.length == 0 ? (
				<View
					style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
				>
					<Ionicons name="cart-outline" size={100} color={COLORS.gray} />
				</View>
			) : (
				<FlatList
					data={filterdata}
					extraData={filterdata}
					keyExtractor={_keyExtractor}
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
