// api/songs.js

// Set song to vercel from uploads folder 
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Logic to fetch songs
    res.status(200).json([{ name: 'Song1', url: '/uploads/song1.mp3', date: new Date() }]);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
