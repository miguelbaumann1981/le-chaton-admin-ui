import axios from 'axios';

const leChatonApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { leChatonApi };
