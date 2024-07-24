// Uncomment to handle local usage

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// // app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, '../public')));

// // Ensure the uploads directory exists
// // const uploadsDir = path.join(__dirname, 'public/uploads');
// const uploadsDir = path.join(__dirname, '../public/uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }

// // Define allowed file types
// const allowedFileTypes = ['audio/mpeg', 'audio/mp4']; // Updated to include 'audio/mp4'

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadsDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// // Restrain inappropriate filename
// const fileFilter = (req, file, cb) => {
//     if (allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type, only MP3 and M4A are allowed!'), false);
//     }
// };

// // Upload constant with multer extension
// const upload = multer({ storage: storage, fileFilter: fileFilter });

// // Post the file into the upload directory
// app.post('/api/upload', upload.single('song'), (req, res) => {
//     if (req.fileValidationError) {
//         return res.status(400).send(req.fileValidationError);
//     }
//     res.send('File uploaded successfully');
// });

// // Get the song from upload directory and show
// app.get('/api/songs', (req, res) => {
//     fs.readdir(uploadsDir, (err, files) => {
//         if (err) {
//             return res.status(500).send('Unable to scan directory');
//         }
//         const songs = files
//             .filter(file => ['.mp3', '.m4a'].includes(path.extname(file).toLowerCase()))
//             .map(file => ({
//                 name: path.basename(file, path.extname(file)), // Get file name without extension
//                 url: `/uploads/${file}`,
//                 date: fs.statSync(path.join(uploadsDir, file)).mtime
//             })).sort((a, b) => b.date - a.date);
//         res.json(songs);
//     });
// });

// // Rename the file and the song's name displayed indirectly from the web
// app.post('/api/rename', (req, res) => {
//     const { oldName, newName } = req.body;
//     const oldPath = path.join(uploadsDir, oldName);
//     const newPath = path.join(uploadsDir, newName);

//     if (!fs.existsSync(oldPath)) {
//         return res.status(404).send('File not found');
//     }

//     fs.rename(oldPath, newPath, (err) => {
//         if (err) {
//             return res.status(500).send('Failed to rename file');
//         }
//         res.send('File renamed successfully');
//     });
// });

// // Server listener, port 3000 as default
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
