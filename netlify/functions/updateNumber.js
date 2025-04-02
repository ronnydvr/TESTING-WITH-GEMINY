const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { number } = JSON.parse(event.body);
    const filePath = path.join(__dirname, '..', '..', 'data.json'); // Path to data.json
    const data = { number: parseInt(number) }; // Ensure it's a number

    await fs.writeFile(filePath, JSON.stringify(data));

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error updating data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update number.' }),
    };
  }
};