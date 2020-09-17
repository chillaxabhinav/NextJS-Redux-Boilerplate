import React, { useEffect } from "react";

import firebase from "firebase/app";
import { firebaseCloudMessaging } from "../utils/webPush";
import { asyncErrorHandler } from "../utils";
import Meta from "./Meta";

const Layout = ({ children }) => {
	const getMessage = () => {
		const messaging = firebase.messaging();
		messaging.onMessage(({ notification: { title, body } }) => {
			// const notification = new Notification(title, { body });
		});
	};

	const setToken = asyncErrorHandler(async function setToken() {
		const token = await firebaseCloudMessaging.init();
		if (token) {
			getMessage();
		}
	});

	useEffect(() => {
		setToken();
	}, []);

	return (
		<>
			<Meta />
			{children}
		</>
	);
};

export default Layout;
