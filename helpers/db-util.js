import { MongoClient } from "mongodb";

export const connectDatabase = async() =>
    await MongoClient.connect(process.env.DB_URL);

export const insertDocument = async(client, collection, document) => {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);
    return result;
};

export const getAllDocuments = async(client, collection, sort) => {
    const db = client.db();
    const documents = await db.collection(collection).find().sort(sort).toArray();
    return documents;
};