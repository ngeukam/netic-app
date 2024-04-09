export default async function sendNotification({ to }) {
    const message = {
		to: to,
		sound: "default",
		title:"test",
		body:"test",
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
}