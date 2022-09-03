import { connectDatabase, insertDocument } from "../../helpers/db-util";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid email address." });
            return;
        }

        let client;

        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({ message: "Connecting to the database failed!" });
            console.log(error);
        }

        try {
            await insertDocument(client, "newsletter", { email: userEmail });
        } catch (error) {
            res.status(500).json({ message: "Inserting data failed!" });
            console.log(error);
        }

        res.status(201).json({ message: "Signed up!" });
        client.close();
    }
}