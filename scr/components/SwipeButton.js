import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import arrowRight from "../../assets/images/arrow-right.png";
import SwipeButton from "rn-swipe-button";
import { useNavigation } from "@react-navigation/native";

const SwButton = () => {
	const navigation = useNavigation()
	return (
		<SwipeButton
			disabled={false}
			//disable the button by doing true (Optional)
			swipeSuccessThreshold={90}
			height={45}
			//height of the button (Optional)
			width={250}
			//width of the button (Optional)
			title="Faire glisser pour accepter"
			titleStyles={{
				fontSize: 15,
				fontWeight: "400",
				color: COLORS.white,
				paddingLeft: 30,
			}}
			onSwipeSuccess={() => {
				navigation.navigate('Details', {ref:'RUDSLENK'})
			}} //After the completion of swipe (Optional)
			containerStyles={{
				borderRadius: 12,
			}}
			railStyles={{
				borderRadius: 12,
			}}
			thumbIconStyles={{
				borderRadius: 10,
			}}
			thumbIconImageSource={arrowRight}
			railFillBackgroundColor="rgba(0, 0, 0, 0.5)" //(Optional)
			railFillBorderColor={COLORS.red} //(Optional)
			thumbIconBackgroundColor={COLORS.red} //(Optional)
			thumbIconBorderColor={COLORS.red} //(Optional)
			railBackgroundColor={COLORS.blue} //(Optional)
			railBorderColor={COLORS.blue} //(Optional)
		/>
	);
};

export default SwButton;
