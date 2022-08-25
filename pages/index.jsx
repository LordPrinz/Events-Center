import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import MainHeader from "./../components/layout/main-header";

function HomePage() {
	const featuredEvents = getFeaturedEvents();

	return (
		<div>
			<MainHeader />
			<EventList items={featuredEvents} />
		</div>
	);
}

export default HomePage;
