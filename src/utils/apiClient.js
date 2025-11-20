import axios from 'axios';

const BASE_URL = 'https://kiryuu03.com/wp-json';
const KIRU_API = `${BASE_URL}/kiru/v1`;
const WP_API = `${BASE_URL}/wp/v2`;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${KIRU_API}${endpoint}`, {
      params,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 15000
    });

    await delay(500);
    return response.data;
  } catch (error) {
    console.error(`Error fetching from API: ${endpoint}`, error.message);
    throw error;
  }
};

export const fetchManga = async (params = {}) => {
  return await fetchFromAPI('/manga', params);
};

export const fetchChapter = async (params = {}) => {
  return await fetchFromAPI('/chapter', params);
};
