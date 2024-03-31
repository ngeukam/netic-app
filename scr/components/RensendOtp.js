import { View, Text, ActivityIndicator, Pressable } from "react-native";
import React from "react";

const RensendOtp = ({
	textStyle1,
    textStyle2,
    textStyle3,
	resendingOtp,
	resendOtp,
	activeResend,
	timeleft,
	targetTime,
}) => {
	return (
		<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
			<Text style={textStyle1}>Pas de code reçu ?</Text>
			{!resendingOtp && (
				<Pressable
					onPress={resendOtp}
					disabled={!activeResend}
					style={{ opacity: !activeResend && 0.5 }}
				>
					<Text style={textStyle2}> Renvoyez </Text>
				</Pressable>
			)}
			{resendingOtp && (
				<>
					<ActivityIndicator color={COLORS.black_ligth} />
				</>
			)}
			{!activeResend && (
				<Text style={textStyle3}>dans {timeleft || targetTime} </Text>
			)}
		</View>
	);
};

export default RensendOtp;
