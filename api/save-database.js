import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests are allowed.' });
  }

  try {
    const newData = request.body; // Vercel automatically parses the JSON body
    await kv.set('database', newData);
    return response.status(200).json({ message: 'Database updated successfully in Vercel KV.' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error saving data to Vercel KV.' });
  }
}
