import express from 'express';
import connectDB from './db/database.js';
import cors from 'cors'; // (Cross-Origin Resource Sharing) middleware --- CONFIRM WITH BRYAN 
import path from 'path'; // used to import the built-in path module, which provides utilities for working with file and directory paths. --- ASK BRYAN
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import userRoutes from './routes/user-router.js';
import postRoutes from './routes/post-router.js';
import commentRoutes from './routes/comment-router.js';

dotenv.config();
connectDB ();
const app = express();
const PORT = process.env.PORT || 3001;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

// Add this route for the homepage
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/blog-api-home.html'); // or whatever the path to your HTML is
  });

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for any unknown route (great for single-page apps)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Combined Frontend + Backend running at http://localhost:${PORT}`);
});
