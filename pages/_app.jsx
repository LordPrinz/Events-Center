import Head from "next/head";
import Layout from "../components/layout/layout";
import NotificationContextProvider from "../store/notification-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<NotificationContextProvider>
			<Layout>
				<Head>
					<title>Next Events</title>
					<meta name="description" content="Next Events" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				</Head>

				<Component {...pageProps} />
			</Layout>
		</NotificationContextProvider>
	);
}

export default MyApp;
