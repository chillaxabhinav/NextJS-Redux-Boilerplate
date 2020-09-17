/* eslint-disable no-undef */

require("dotenv").config({ path: ".env" });
const express = require("express");
const next = require("next");

const app = next({ dev: process.env.IS_DEV === "true" });
const handler = app.getRequestHandler();

// set port
const port = process.env.PORT || 8080;

app.prepare().then(() => {
	const server = express();
	server.get("/service-worker.js", (req, res) => {
		app.serveStatic(req, res, "./.next/service-worker.js");
	});

	const serviceWorkers = [
		{
			filename: "service-worker.js",
			path: "./.next/service-worker.js",
		},
		{
			filename: "firebase-messaging-sw.js",
			path: "./public/firebase-messaging-sw.js",
		},
	];

	serviceWorkers.forEach(({ filename, path }) => {
		server.get(`/${filename}`, (req, res) => {
			app.serveStatic(req, res, path);
		});
	});

	server.get("*", (req, res) => {
		return handler(req, res);
	});

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
