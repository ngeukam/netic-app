import {
	View,
	SafeAreaView,
	StyleSheet,
	FlatList,
	RefreshControl,
	Platform,
	ActivityIndicator,
} from "react-native";
import { useRef, useCallback, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Header4 from "../components/Header4";
import BottomSheet from "../components/BottomSheet";
import PublicationListItem from "../components/PublicationListItem";
import { COLORS, icons } from "../constants";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import { useScrollToTop, useFocusEffect } from "@react-navigation/native";
import { instance } from "../../config";
const Publications = () => {
	const navigation = useNavigation();
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
			.get(`order` + query)
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
	const AddPublication = () => {
		navigation.navigate("Create");
	};
	const _renderItem = useCallback(
		({ item }) => {
			return (
				<PublicationListItem
					id={item?.id}
					departure_place={item?.departure_place}
					arrival_place={item?.arrival_place}
					product={item?.product}
					budget={item?.budget}
					devise={item?.devise}
					reference={item?.reference}
					job_status={item?.accepted[0]?.job_status}
					created_at={item?.created_at}
					is_paid={item?.is_paid}
				/>
			);
		},
		[data]
	);
	const _keyExtractor = useCallback((item, index) => index);
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
			<Header4 title="Mes demandes" onPress={() => refRBSheet.current.open()} />
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
					<Ionicons name="folder-open" size={100} color={COLORS.gray} />
				</View>
			) : (
				<FlatList
					data={data}
					extraData={data}
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
			<Button
				style4={styles.pressable}
				onPress={AddPublication}
				imgicon={icons.plus}
				style5={{ height: 24, width: 24, tintColor: COLORS.white }}
			/>
		</SafeAreaView>
	);
};

export default Publications;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		paddingTop: 20,
	},
	pressable: {
		height: Platform.OS === "ios" ? 60 : 50,
		width: Platform.OS === "ios" ? 90 : 80,
		borderRadius: Platform.OS === "ios" ? 17 : 12,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		right: 30,
		bottom: 30,
	},
});
