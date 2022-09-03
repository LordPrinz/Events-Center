import { MongoClient } from "mongodb";

const connectDatabase = async() =>
    await MongoClient.connect(process.env.DB_URL);

const insertDocument = async(client, document) => {
    const db = client.db();

    await db.collection("emails").insertOne(document);
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes("@")) {
            res.status(422).json({ message: "Invalid email address." });
            return;
        }

        let client;

        try {
            client = connectDatabase();
        } catch (error) {
            res.status(500).json({ message: "Connecting to the database failed!" });
        }

        try {
            await insertDocument(client, { email: userEmail });
            client.close();
        } catch (error) {
            res.status(500).json({ message: "Inserting data failed!" });
        }

        res.status(201).json({ message: "Signed up!" });
    }
}