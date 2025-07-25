const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { video_url } = JSON.parse(event.body);
  const videoId = extractVideoId(video_url);
  
  if (!videoId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid YouTube URL' })
    };
  }

  const code = uuidv4().split('-')[0]; // Short unique code
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      code,
      redirect_url: `/.netlify/functions/redirect?code=${code}`,
      youtube_url: youtubeUrl,
      clean_url: `${process.env.URL}/${code}` // Your Netlify site URL
    })
  };
};

function extractVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
