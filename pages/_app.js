import React from "react";
import App from "next/app";
import withRedux from 'next-redux-wrapper';
import {Provider} from 'react-redux';
import store from '../redux/store';

import Layout from "../components/Layout";
import FCM from "../components/FCM";

import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/main.scss";

class MyApp extends App {

	static async getInitialProps({Component, ctx}) {

		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
		
		return {pageProps: pageProps};
		
    }

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Provider store={store}>
				<Layout>
					<FCM />
					<Component {...pageProps} />
				</Layout>
			</Provider>
		);
	}
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
