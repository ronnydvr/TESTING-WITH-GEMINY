cconst fs = require('fs').promises;
const path = require('path');

exports.handler = async (event) => {
  console.log("Current working directory:", process.cwd()); // Added console.log

  try {
    const filePath = path.join(process.cwd(), 'data.json');
    const rawData = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(rawData);

    return {
      statusCode: 200,
      body: JSON.stringify({ number: data.number }),
    };
  } catch (error) {
    console.error("Error reading data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read number.' }),
    };
  }
};