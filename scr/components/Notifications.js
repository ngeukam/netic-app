import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { PROJECT_ID } from "../../config";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export default function AppNotifications({title, body} ) {

	const [expoPushToken, setExpoPushToken] = useState("");

	const sendNotification = async () => {
		const message = {
			to: expoPushToken,
			sound: "default",
			title,
			body,
		};
		await fetch("https://exp.host/--/api/v2/push/send", {
			method: "POST",
			headers: {
				host: "exp.host",
				accept: "application/json",
				"accept-encoding": "gzip, deflate",
				"content-type": "application/json",
			},
			body: JSON.stringify(message),
		});
	};

	async function registerForPushNotificationsAsync() {
		let token;
		const projectId = PROJECT_ID;

		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}

		if (Device.isDevice) {
			const {
				status: existingStatus,
			} = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			// Learn more about projectId:
			// https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
			token = (
				await Notifications.getExpoPushTokenAsync({
					projectId: `${projectId}`,
				})
			).data;
			console.log(token);
		} else {
			alert("Must use physical device for Push Notifications");
		}

		return token;
	}
	useEffect(() => {
		registerForPushNotificationsAsync()
			.then((token) => {
				setExpoPushToken(token);
				console.log("token: ", token);
                sendNotification();
			})
			.catch((err) => console.log(err));
	}, []);

    return ;
	// return (
	// 	<View style={styles.container}>
	// 		<Text>Open up App.js to start working on your app!</Text>
	// 		<Button title="Send push notification" onPress={sendNotification} />
	// 	</View>
	// );
}
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 		paddingTop: 80,
// 	},
// });