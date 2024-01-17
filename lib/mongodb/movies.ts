import clientPromise from '.';
import * as mongoDB from 'mongodb';

// import client from '.';

let client;
let db: mongoDB.Db;
let movies: mongoDB.Collection;

// database name
const dbName = 'sample_mflix';

const init = async () => {
  if (db) return;
  try {
    client = await clientPromise;
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
    db = await client.db(dbName);
    movies = await db.collection('movies');
  } catch (error) {
    console.log('ERROR: ', error);
    throw new Error('Failed to establish connection to database');
  }
};

(async () => {
  await init();
})();

export const getMovies = async (skip: number, limit: number) => {
  try {
    let moviesArray = [];
    if (!movies) await init();
    const result = await movies.find().limit(limit).skip(skip);

    for await (const mov of result) {
      console.log('mov: ', mov);
      moviesArray.push(mov);
    }
    return moviesArray;
  } catch (error) {
    throw new Error('Failed to get movies');
  }
};
