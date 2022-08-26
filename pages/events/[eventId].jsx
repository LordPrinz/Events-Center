import { Fragment } from "react";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Head from "next/head";

function EventDetailPage({ selectedEvent }) {
	if (!selectedEvent) {
		return (
			<div className="center">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<Fragment>
			<Head>
				<title>{selectedEvent.title}</title>
				<meta name="description" content={selectedEvent.description} />
			</Head>
			<EventSummary title={selectedEvent.title} />
			<EventLogistics
				date={selectedEvent.date}
				address={selectedEvent.location}
				image={selectedEvent.image}
				imageAlt={selectedEvent.title}
			/>
			<EventContent>
				<p>{selectedEvent.description}</p>
			</EventContent>
		</Fragment>
	);
}

export async function getStaticProps(context) {
	const eventId = context.params.eventId;

	const event = await getEventById(eventId);

	if (!event) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			selectedEvent: event,
		},
		revalidate: 30,
	};
}

export async function getStaticPaths() {
	const events = await getFeaturedEvents();

	const paths = events.map((event) => ({ params: { eventId: event.id } }));

	return {
		paths,
		fallback: "blocking",
	};
}

export default EventDetailPage;
