import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

function FilteredEventsPage() {
	const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();

	const filterData = router.query.slug;

	const { data, error } = useSWR(
		"https://nextevents-34a03-default-rtdb.firebaseio.com/events.json",
		async (url) => {
			const data = await fetch(url).then((res) => res.json());
			const events = [];

			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}

			return events;
		}
	);

	useEffect(() => {
		setLoadedEvents(data);
	}, [data]);

	let pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta name="description" content="A list of filtered events." />
		</Head>
	);

	if (!loadedEvents) {
		return (
			<>
				{pageHeadData}
				<p className="center">Loading...</p>
			</>
		);
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta name="description" content={`All events for ${numMonth}/${numYear}.`} />
		</Head>
	);

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12 ||
		error
	) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
		);
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}
export default FilteredEventsPage;
