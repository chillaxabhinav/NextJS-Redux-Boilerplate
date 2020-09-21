import { Component } from "react";
import firebase from "firebase/app";
import "firebase/messaging";

import { firebaseCloudMessaging } from "../utils/webPush";

class FCM extends Component {
	createNotification(payload) {
		console.log({ payload });
	}

	componentDidMount() {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("./firebase-messaging-sw.js")
				.then((registration) => {
					console.log(
						`[SERVICE WORKER] Registration successfull, scope is ${registration.scope}`,
					);
				})
				.catch((err) => {
					console.log("[SERVICE WORKER] Registration Failed :", err);
				});
			navigator.serviceWorker.addEventListener("message", (message) =>
				console.log({ message }),
			);
		}

		// if (firebase.messaging.isSupported()) {
		// 	firebaseCloudMessaging.init();
		// 	const messaging = firebase.messaging();
		// 	messaging.onMessage((payload) => {
		// 		this.createNotification(payload);
		// 	});
		// }
	}

	render() {
		return null;
	}
}

export default FCM;
