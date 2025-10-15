import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).end();
  }

  try {
    await kv.set('database', request.body);
    return response.status(200).json({ message: 'Database updated.' });
  } catch (error) {
    return response.status(500).json({ message: 'Error saving data.' });
  }
}
