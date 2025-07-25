exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { video_url } = JSON.parse(event.body);
  // Simulate processing (replace with real YouTube API calls)
  const mockResponse = {
    success: true,
    code: Math.random().toString(36).substring(7),
    title: "Test Video",
    channelTitle: "Test Channel",
    thumbUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    link: `https://youtube.com/watch?v=dQw4w9WgXcQ`
  };

  return {
    statusCode: 200,
    body: JSON.stringify(mockResponse)
  };
};
