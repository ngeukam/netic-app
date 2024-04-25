import Toast from "react-native-root-toast";

export function ToastErrorMessage(message) {
	let toast = Toast.show(message, {
		duration: Toast.durations.LONG,
		position: Toast.positions.CENTER,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
	});
	setTimeout(function () {
		Toast.hide(toast);
	}, 3000);
}
