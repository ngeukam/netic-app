import { View, Text, Image, StyleSheet, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS, icons } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import InputField from "./InputField";
const Header = ({ title, onPress, searchText, onChangeText }) => {
	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
	const handleVisible = () => {
		setModalVisible(true);
	};
	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Pressable
					onPress={() => navigation.toggleDrawer()}
					style={styles.iconContainer}
				>
					<Image resizeMode="contain" style={styles.icon} source={icons.menu} />
				</Pressable>
				<Text
					style={{
						fontSize: 17,
						fontWeight: "bold",
					}}
				>
					{title}
				</Text>
			</View>
			{!modalVisible && (
				<Ionicons
					name="search"
					size={30}
					color={COLORS.black}
					onPress={() => handleVisible()}
					style={{ marginRight: 25 }}
				/>
			)}
			<Pressable onPress={onPress} style={styles.iconContainer}>
				<Image resizeMode="contain" style={styles.icon} source={icons.more} />
			</Pressable>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<InputField
							autoCapitalize="none"
							placeholder="Recherchez un lieu de récupération"
							placeholderTextColor="#6b7280"
							style={styles.inputControl}
							value={searchText}
							onChangeText={onChangeText}
							autoFocus={true}
						/>
						<Pressable
							style={[styles.button]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Ionicons name="close-sharp" size={40} color={COLORS.white} />
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		alignContent: "center",
		paddingVertical: 10,
		backgroundColor: COLORS.white,
	},
	iconContainer: {
		height: 45,
		width: 45,
		borderRadius: 999,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.white,
	},
	icon: {
		height: 24,
		width: 24,
		tintColor: COLORS.black,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.7)",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 2,
	},
	button: {
		borderRadius: 13,
		padding: 10,
		top: 10,
		right: 0,
		position: "absolute",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	inputControl: {
		height: 44,
		width: "90%",
		backgroundColor: COLORS.white,
		paddingHorizontal: 15,
		borderRadius: 5,
		fontSize: 17,
		fontWeight: "400",
		color: COLORS.black_ligth,
	},
});
export default Header;
