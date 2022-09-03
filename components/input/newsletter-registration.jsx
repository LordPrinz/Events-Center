import { useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";

import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
	const emailInputRef = useRef();
	const notificationCtx = useContext(NotificationContext);

	function registrationHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;

		notificationCtx.showNotification({
			title: "Signing up...",
			message: "Registering for newsletter.",
			status: "pending",
		});

		fetch("/api/newsletter", {
			method: "POST",
			body: JSON.stringify({ email: enteredEmail }),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}

				response.json().then((data) => {
					throw new Error(data.message || "Something went wrong!");
				});
			})
			.then((data) => {
				notificationCtx.showNotification({
					title: "Success!",
					messaeg: "Successfully registered for newsletter",
					status: "success",
				});
			})
			.catch((error) => {
				notificationCtx.showNotification({
					title: "Error!",
					messaeg: error.message || "Something went wrong!",
					status: "error",
				});
			});
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						type="email"
						id="email"
						placeholder="Your email"
						aria-label="Your email"
						ref={emailInputRef}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
