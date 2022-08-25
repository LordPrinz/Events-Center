import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import MainHeader from "./../components/layout/main-header";

function HomePage({ events }) {
	return (
		<div>
			<MainHeader />
			<EventList items={events} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: {
			events: featuredEvents,
		},
		revalidate: 1800,
	};
}

export default HomePage;
