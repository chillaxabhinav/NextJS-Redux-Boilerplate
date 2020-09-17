import "firebase/messaging";
import firebase from "firebase/app";
import localForage from "localforage";
import { asyncErrorHandler } from ".";

const firebaseCloudMessaging = {
	tokenInLocalForage: async () => {
		return localForage.getItem("fcm_token");
	},

	init: asyncErrorHandler(async function () {
		if (!firebase.apps.length) {
			firebase.initializeApp({
				apiKey: "AIzaSyC-8yqeoMshfvno7sFClct3guI42fA9GFo",
				authDomain: "next-ead8b.firebaseapp.com",
				databaseURL: "https://next-ead8b.firebaseio.com",
				projectId: "next-ead8b",
				storageBucket: "next-ead8b.appspot.com",
				messagingSenderId: "829697674509",
				appId: "1:829697674509:web:1dd10c589230ecbc1f7444",
			});

			try{
				const messaging = firebase.messaging();
				messaging.usePublicVapidKey(
					"BLGc4mkUhebKaitCJIQ4VwKKeLZJHNQX0-s_NY3dSUOkp4FSJFECb78HfirLUTkcE3-MjfZaLsfZOIffiv0H1W8",
				);
				const tokenInLocalForage = await this.tokenInLocalForage();

				if (tokenInLocalForage !== null) {
					console.log("FCM TOKEN IN LOCALFORAGE ", tokenInLocalForage);
					return tokenInLocalForage;
				}

				const status = await Notification.requestPermission();

				if (status && status === "granted") {
					const fcm_token = await messaging.getToken();
					if (fcm_token) {
						localForage.setItem("fcm_token", fcm_token);
						console.log(`FCM TOKEN ==> ${fcm_token}`);
						return fcm_token;
					}
				}
				else {
					throw new Error("Notification Permission Denied !");
				}
			}
			catch(e){
				console.error(error);
				return null;
			}
		}
	}),
};

export { firebaseCloudMessaging };
