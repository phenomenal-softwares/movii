module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ Error: 'Method not allowed.' });
  }

  const search = typeof req.query.s === 'string' ? req.query.s.trim() : '';
  const id = typeof req.query.i === 'string' ? req.query.i.trim() : '';
  if (Boolean(search) === Boolean(id)) {
    return res.status(400).json({ Error: 'Provide either a search term or a movie ID.' });
  }

  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    console.error('OMDB_API_KEY is not configured.');
    return res.status(500).json({ Error: 'Movie search is not configured.' });
  }

  const url = new URL('https://www.omdbapi.com/');
  url.searchParams.set('apikey', apiKey);
  url.searchParams.set(search ? 's' : 'i', search || id);

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('OMDb request failed:', error);
    return res.status(502).json({ Error: 'Failed to fetch movie data.' });
  }
};
