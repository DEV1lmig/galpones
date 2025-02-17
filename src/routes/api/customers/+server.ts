import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index';

export async function GET() {
  try {
    const result = await db.query.customers.findMany();
    return json(result);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return json({ error: 'Error fetching customers' }, { status: 500 });
  }
}
