const storage = {}; // In-memory storage (replace with DB in production)

exports.handler = async (event) => {
  const { code } = event.queryStringParameters;
  const targetUrl = storage[code];

  if (!targetUrl) {
    return {
      statusCode: 404,
      body: 'Link not found'
    };
  }

  // Track analytics here (increment counters, etc.)
  
  return {
    statusCode: 302,
    headers: {
      Location: targetUrl
    }
  };
};
