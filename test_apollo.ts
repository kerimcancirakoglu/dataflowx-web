import client from './src/lib/apollo-client';
import { GET_ALL_POSTS } from './src/lib/graphql-queries';
require('dotenv').config({ path: '.env.local' });

async function run() {
  try {
    const { data } = await client.query({
      query: GET_ALL_POSTS,
      variables: { language: 'EN' },
    });
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error:', e);
  }
}
run();
