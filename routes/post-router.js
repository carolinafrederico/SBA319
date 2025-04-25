import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/post-controller.js';

const router = express.Router();

// INDEX - Get all posts
router.get('/', getPosts);

// SHOW - Get one post by ID
router.get('/:id', getPostById);

// CREATE - Add a new post
router.post('/', createPost);

// UPDATE - Edit a post by ID
router.put('/:id', updatePost);

// DELETE - Delete a post by ID
router.delete('/:id', deletePost);

export default router;
