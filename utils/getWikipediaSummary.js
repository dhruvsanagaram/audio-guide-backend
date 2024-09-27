const axios = require('axios');

async function getWikipediaSummary(location) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(location)}`;
    const response = await axios.get(url);

    if (response.data && response.data.extract) {
      return response.data.extract;
    } else {
      throw new Error('No summary found for location');
    }
  } catch (error) {
    console.error('Error fetching Wikipedia summary:', error);
    return 'No information found for this location.';
  }
}

module.exports = { getWikipediaSummary };
