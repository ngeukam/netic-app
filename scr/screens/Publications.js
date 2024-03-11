import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	FlatList,
	RefreshControl,
	Pressable,
	Image,
	Platform
} from "react-native";
import React, { useRef, useCallback, useState } from "react";
import Header from "../components/Header";
import BottomSheet from "../components/BottomSheet";
import PublicationListItem from "../components/PublicationListItem";
import { COLORS, icons } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Publications = () => {
	const navigation = useNavigation();
	const refRBSheet = useRef();
	const data = new Array(20).fill(0).map((_, index) => ({ id: index }));
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);
	const AddPublication = () => {
		navigation.navigate("Create");
	};
	const renderItem = useCallback(({}) => {
		return <PublicationListItem />;
	});
	const keyExtractor = useCallback((item) => `${item.id}`);

	const onEndReached = () => {
		alert("stop");
	};
	return (
		<SafeAreaView style={styles.container}>
			<Header
				title="Mes offres"
				onPress={() => refRBSheet.current.open()}
			/>
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
			<Pressable style={styles.pressable} onPress={AddPublication}>
				<Image
					source={icons.plus}
					resizeMode="contain"
					style={{
						height: 24,
						width: 24,
						tintColor: COLORS.white,
					}}
				/>
			</Pressable>
		</SafeAreaView>
	);
};

export default Publications;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.gray,
		paddingTop: 20,
	},
	pressable: {
		height: Platform.OS === "ios" ? 60 : 50,
		width: Platform.OS === "ios" ? 90 : 80,
		borderRadius: Platform.OS === "ios" ? 17 : 12,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		right: 30,
		bottom: 30,
	},
});
