import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants";
import moment from "moment";
import currencyFormat from "../utils/CurrencyFormat";
import PaymentStatus from "../utils/FPaymentStatus";

export const CARDHEIGHT_J = 130;
export const PADDING_HORIZONTAL_J = 80;
const InvoiceItem = ({
	reference,
	amount,
	devise,
	remaining_amount,
	status,
	created_at,
}) => {
	return (
		<View style={styles.container}>
			{/* REF AND AMOUNT CONTAINER */}
			<View style={styles.ref_amount}>
				<Text style={{ fontSize: 15, color: COLORS.white }}> {reference}</Text>
				<Text style={{ fontSize: 17, fontWeight: "700", color: COLORS.white }}>
					{" "}
					À payer : {currencyFormat(amount, devise)}
				</Text>
			</View>
			{/* REST TO PAY */}
			<View style={styles.pay_status}>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "500",
						color: "rgba(255, 0, 0, 0.7)",
					}}
				>
					Reste à payer:{" "}
					{remaining_amount!==undefined
						? currencyFormat(remaining_amount, devise)
						: currencyFormat(amount, devise)}
				</Text>
				<Text
					style={{
						fontSize: 15,
						fontWeight: "500",
						color: COLORS.white,
					}}
				>
					{status!==undefined?PaymentStatus(status):PaymentStatus(1)}
				</Text>
			</View>

			<View style={styles.date}>
				<Text
					style={{
						fontSize: 12,
						color:COLORS.white
					}}
				>
					{moment(created_at).startOf("minutes").fromNow()}
				</Text>
				
			</View>
		</View>
	);
};

export default InvoiceItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.blue,
		justifyContent: "center",
		borderRadius: 5,
		height: CARDHEIGHT_J,
		paddingHorizontal: PADDING_HORIZONTAL_J,
		flex: 1,
		flexDirection: "row",
		padding: 10,
		shadowColor: "black",
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		shadowOffset: {
			height: 0,
			width: 1,
		},
		elevation: 2,
	},
	ref_amount: {
		flexDirection: "row",
		position: "absolute",
		top: 0,
		margin: 5,
		left: 0,
		right: 0,
		justifyContent: "space-between",
	},

	pay_status: {
		flexDirection: "row",
		position: "absolute",
		right: 0,
		left: 0,
		justifyContent: "space-between",
		top: CARDHEIGHT_J - 60,
		margin: 5,
	},
	date: {
		flexDirection: "row",
		position: "absolute",
		left: 0,
		top: CARDHEIGHT_J - 30,
		margin: 5,
	},
});
