/* eslint-disable no-undef */

importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

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

	const messaging = firebase.messaging();

	// Background Notifications
	messaging.setBackgroundMessageHandler((payload) => console.log({ payload }));
}
