declare global {
  var mongoClientPromise: Promise<MongoClient>; // This must be a `var` and not a `let / const`
}

import { MongoClient } from 'mongodb';

const URI = process.env.MONGODB_URI!;
const options = {};

if (!URI) {
  throw new Error('The MongoDB URI cannot be found in .env.local');
}

const client = new MongoClient(URI, options);

//database name
const dbName = 'sample_mflix';

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV !== 'production') {
  if (!global.mongoClientPromise) {
    global.mongoClientPromise = client.connect();
  }
  clientPromise = global.mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
