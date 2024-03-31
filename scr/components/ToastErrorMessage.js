import Toast from "react-native-root-toast";

export function ToastErrorMessage(message) {
	// Add a Toast on screen.
	let toast = Toast.show(message, {
		duration: Toast.durations.LONG,
		position: Toast.positions.CENTER,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
	});
	// You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
	setTimeout(function () {
		Toast.hide(toast);
	}, 3000);
}
