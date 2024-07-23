// api/song.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        res.status(500).json({ error: 'Failed to read uploads directory' });
        return;
      }

      const songs = files
        .filter(file => file.endsWith('.mp3') || file.endsWith('.m4a'))
        .map(file => ({
          name: path.basename(file, path.extname(file)), // Remove extension
          url: `/uploads/${file}`,
          date: fs.statSync(path.join(uploadsDir, file)).mtime
        }));

      res.status(200).json(songs);
    });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
