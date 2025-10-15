import { createKysely } from '@vercel/postgres-kysely';
import { kv } from '@vercel/kv';
import initialDb from '../database.json'; // We use this only for the first time

export default async function handler(request, response) {
  try {
    // Check if the database already exists in KV
    let dbData = await kv.get('database');

    // If it doesn't exist, we'll set it up for the first time
    if (!dbData) {
      await kv.set('database', initialDb);
      dbData = initialDb;
      console.log("Initialized database in Vercel KV for the first time.");
    }

    return response.status(200).json(dbData);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error fetching data from Vercel KV.' });
  }
}
