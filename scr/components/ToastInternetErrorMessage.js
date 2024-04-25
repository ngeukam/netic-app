import Toast from "react-native-root-toast";
import { COLORS } from "../constants";

export function ToastInternetErrorMessage(message) {
	let toast = Toast.show(message, {
		duration: Toast.durations.LONG,
		position: Toast.positions.TOP,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
        backgroundColor:COLORS.red,
	});
	setTimeout(function () {
		Toast.hide(toast);
	}, 5000);
}