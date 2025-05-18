const axios = require('axios');

const verifyPhone = async (number) => {
  const API_KEY = process.env.NUMVERIFY_API_KEY;
  console.log('🔐 Using NumVerify API KEY:', API_KEY); // Log the key to confirm .env is working

  const url = `http://apilayer.net/api/validate?access_key=${API_KEY}&number=${encodeURIComponent(number)}`;
  console.log('🌍 Requesting URL:', url);

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error('❌ NumVerify error:', err.message);
    throw new Error('NumVerify request failed');
  }
};

module.exports = verifyPhone;
