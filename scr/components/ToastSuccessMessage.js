import React from "react";
import Toast from "react-native-root-toast";
import { COLORS } from "../constants";

export function ToastSuccessMessage(message) {
	let toast = Toast.show(message, {
		duration: Toast.durations.LONG,
		position: Toast.positions.TOP,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
		backgroundColor:COLORS.blue,
	});
	setTimeout(function () {
		Toast.hide(toast);
	}, 5000);
}
