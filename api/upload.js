// api/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Handle upload song files from vercel
export default function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public/uploads');
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Upload failed' });
      return;
    }
    // Handle file rename and other logic
    res.status(200).json({ message: 'File uploaded successfully' });
  });
}
