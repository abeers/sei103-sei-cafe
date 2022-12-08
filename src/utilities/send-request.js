import { getToken } from './users-service';

const herokuUrl = 'https://stormy-plateau-80569.herokuapp.com/'

export default async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch takes an optional options object as the 2nd argument
  // used to include a data payload, set headers, etc. 
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Ensure headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }
  const apiUrl = process.env.DEVELOPMENT ? url : herokuUrl + url
  const res = await fetch(apiUrl, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}