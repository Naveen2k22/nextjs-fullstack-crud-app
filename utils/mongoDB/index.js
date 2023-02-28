import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  const URI = process.env.MONGODB_URI;

  if (!URI) {
    throw new Error("Add MongoDB URI in env!");
  }

  const client = await MongoClient.connect(URI, options)
  return client;
};

export const getAllDocuments = async (client, collection, filter, sort) => {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
};

export const getSingleDocument = async (client, collection, filter) => {
  const db = client.db();

  const document = await db.collection(collection).findOne(filter);

  return document;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const updateDocument = async (client, collection, document, filter) => {
  const db = client.db();

  const result = await db
    .collection(collection)
    .findOneAndUpdate(filter, document);

  return result;
};

export const deleteDocument = async (client, collection, filter) => {
  const db = client.db();

  const result = await db.collection(collection).findOneAndDelete(filter);

  return result;
};
