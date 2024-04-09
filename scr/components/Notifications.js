import { useState, useEffect } from "react";
import registerForPushNotificationsAsync from "../utils/registerForPushNotificationsAsync";
import sendNotification from "../utils/sendNotification";

export default function AppNotifications() {
	const [expoPushToken, setExpoPushToken] = useState("");
	useEffect(() => {
		registerForPushNotificationsAsync()
			.then((token) => {
				setExpoPushToken(token);
				console.log("token: ", token);
				sendNotification({to:expoPushToken});
			})
			.catch((err) => console.log(err));
	}, []);

}
