import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8080';

export const fetchData = (path: string) =>
  axios.get(`${API_ENDPOINT}${path}`).then((res) => res.data);
