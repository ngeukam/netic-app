import { View, Text, StyleSheet, Image } from "react-native";
import { useCallback, useState, useContext } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS, images } from "../constants";
import Button from "./Button";
import { instance } from "../../config";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import currencyFormat from "../utils/CurrencyFormat";
import { AuthContext } from "../context/AuthContext";
import { ToastSuccessMessage } from "./ToastSuccessMessage";

const BottomSheet = ({ bottomSheetRef }) => {
	const { userId } = useContext(AuthContext);
	const navigation = useNavigation();
	const [data, setData] = useState([]);
	const [load, setLoad] = useState(false);

	const handleGetAmountAndFees = async () => {
		await instance.get(`amount`).then((response) => {
			setData(response.data);
		});
	};
	const handleCreateInvoice = async () => {
		await instance
			.post(`invoice`, {
				invoice_user: userId,
				amount: data[0]?.total_paid_amount,
			})
			.then(() => {
				navigation.navigate("Invoice");
			});
	};
	const handleUpdatePaid = async () => {
		setLoad(true);
		await instance
			.put(`amount`)
			.then(() => {
				if (data[0]?.total_paid_amount) {
					handleCreateInvoice();
					ToastSuccessMessage(
						`Vous avez une nouvelle facture impayée d'une valeur de ${currencyFormat(
							data[0]?.total_paid_amount,
							1
						)}`
					);
				}
			})
			.finally(() => {
				setLoad(false);
			});
	};
	useFocusEffect(
		useCallback(() => {
			handleGetAmountAndFees();
		}, [])
	);
	return (
		<RBSheet
			ref={bottomSheetRef}
			height={300}
			openDuration={250}
			closeOnDragDown={true}
			closeOnPressBack={true}
			closeOnPressMask={true}
			customStyles={{
				wrapper: {
					backgroundColor: "rgba(0,0,0,0.5)",
				},
				draggableIcon: {
					backgroundColor: COLORS.gray,
					width: 100,
				},
				container: {
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					paddingHorizontal: 12,
				},
			}}
		>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<Text
					style={{
						fontSize: 18,
						fontWeight: 500,
						color: COLORS.black_ligth,
						marginBottom: 30,
					}}
				>
					Votre état actuel
				</Text>
				<Image
					source={images.logo1}
					alt="App Logo"
					resizeMode="contain"
					style={styles.headerImg}
				/>
			</View>

			<View style={styles.total_gain}>
				<Text
					style={{
						fontSize: 17,
						fontWeight: 600,
						color: COLORS.placeholder_text_color,
					}}
				>
					Total gagné
				</Text>
				<Text style={{ fontSize: 17, fontWeight: 800, color: COLORS.blue }}>
					{data[1]?.total_budget
						? currencyFormat(data[1]?.total_budget, 1)
						: currencyFormat(0, 1)}
				</Text>
			</View>
			<View style={styles.comm_fees}>
				<Text
					style={{
						fontSize: 17,
						fontWeight: 600,
						color: COLORS.placeholder_text_color,
					}}
				>
					Frais de comm
				</Text>
				<Text style={{ fontSize: 17, fontWeight: 800, color: COLORS.red }}>
					{data[0]?.total_paid_amount
						? currencyFormat(data[0]?.total_paid_amount, 1)
						: currencyFormat(0, 1)}
				</Text>
			</View>
			<Button
				onPress={() => handleUpdatePaid()}
				style1={styles.formAction}
				style2={styles.btn}
				style3={styles.btnText}
				buttontext={"Continuez"}
				activityIndicator={load ? true : false}
				disabled={load ? true : false}
			/>
		</RBSheet>
	);
};

export default BottomSheet;
const styles = StyleSheet.create({
	headerImg: {
		width: 40,
		height: 40,
		borderRadius: 5,
	},
	// research_criteria: {
	// 	flexDirection: "row",
	// 	justifyContent: "space-between",
	// 	marginVertical: 20,
	// },
	total_gain: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 20,
	},
	comm_fees: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 20,
	},
	/** Button */

	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		paddingVertical: 8,
		borderWidth: 1,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
		position: "absolute",
		right: 0,
		left: 0,
		height: 50,
		// top:25
	},
	btnText: {
		fontSize: 17,
		lineHeight: 24,
		fontWeight: "400",
		color: COLORS.white,
		textAlign: "center",
	},
});
