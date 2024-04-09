import {
	View,
	StyleSheet,
	SafeAreaView,
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Platform,
} from "react-native";
import { useState, useCallback, useRef } from "react";
import { COLORS } from "../constants";
import { useFocusEffect } from "@react-navigation/native";
import Header4 from "../components/Header4";
import BottomSheet from "../components/BottomSheet";
import { AntDesign } from "@expo/vector-icons";
import { instance } from "../../config";
import InvoiceItem from "../components/InvoiceItem";

export const CARDHEIGHT_J = 130;
export const PADDING_HORIZONTAL_J = 80;
const Invoice = () => {
	const [data, setData] = useState([]);
	const [load, setLoad] = useState(true);
	const [loadMore, setLoadMore] = useState(true);
	const [showLoader, setShowLoader] = useState(true);
	const [offset, setOffset] = useState(0);
	const [refreshing, setRefreshing] = useState(false);
	const ref = useRef(null);
	const refRBSheet = useRef();
	let limit = 5;
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		handleGetAllInvoices();
		setTimeout(() => {
			setRefreshing(false);
		}, 5000);
	}, []);

	useFocusEffect(
		useCallback(() => {
			setLoadMore(true);
			handleGetAllInvoices();
		}, [])
	);
	const handleGetAllInvoices = async () => {
		setLoadMore(true);
		let query = `?l=${limit}&o=${offset}`;
		await instance
			.get(`invoice-list/` + query)
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
				<InvoiceItem
					reference={item?.reference}
					amount={item?.amount}
					remaining_amount={item?.payment_info[0]?.remaining_amount}
					status={item?.payment_info[0]?.status}
					devise={1}
					created_at={item.created_at}
				/>
			);
		},
		[data]
	);

	const _keyExtractor = useCallback((item, index) => index);
	const onEndReached = () => {
		if (loadMore) {
			handleGetAllInvoices();
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
			<Header4 title="Mes Factures" onPress={() => refRBSheet.current.open()} />
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
					<AntDesign name="creditcard" size={100} color={COLORS.gray} />
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
		</SafeAreaView>
	);
};

export default Invoice;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		paddingTop: 20,
	},
});
