import express from 'express';
import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/comment-controller.js';

const router = express.Router();

// INDEX - Get all comments
router.get('/', getComments);

// SHOW - Get one comment by ID
router.get('/:id', getCommentById);

// CREATE - Add a new comment
router.post('/', createComment);

// UPDATE - Edit a comment by ID
router.put('/:id', updateComment);

// DELETE - Delete a comment by ID
router.delete('/:id', deleteComment);

export default router;
