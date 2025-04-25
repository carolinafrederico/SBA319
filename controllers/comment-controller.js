import Comment from '../models/comment-model.js';

// INDEX – Get all comments
async function getComments(req, res) {
  try {
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching comments', error: error.message });
  }
}

// SHOW – Get one comment by ID
async function getCommentById(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) throw new Error('Comment not found');
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json({ message: 'Comment not found', error: error.message });
  }
}

// CREATE – Add a new comment
async function createComment(req, res) {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating comment', error: error.message });
  }
}

// UPDATE – Update a comment
async function updateComment(req, res) {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComment) throw new Error('Comment not found');
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating comment', error: error.message });
  }
}

// DELETE – Remove a comment
async function deleteComment(req, res) {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) throw new Error('Comment not found');
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting comment', error: error.message });
  }
}

export {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};
