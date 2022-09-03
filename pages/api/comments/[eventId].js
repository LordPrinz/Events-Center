import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const eventId = req.query.eventId;

    const client = await MongoClient.connect(process.env.DB_URL);

    if (req.method === "POST") {
        const { email, name, text } = req.body;
        if (!email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !text ||
            text.trim() === ""
        ) {
            res.status(422).json({ message: "Invalid input." });
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId,
        };

        const db = client.db();

        const result = await db.collection("comments").insertOne(newComment);

        newComment.id = result.insertedId;

        res.status(201).json({ message: "Added comment.", comment: newComment });
    }

    if (req.method === "GET") {
        const dummyList = [
            { _id: "c1", name: "Oskar", text: "A first comment!" },
            { _id: "c2", name: "Paweł", text: "A second comment!" },
        ];
        res.status(200).json({ comments: dummyList });
    }

    client.close();
}