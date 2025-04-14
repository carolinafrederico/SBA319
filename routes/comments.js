const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/auth');

let comments = [];

router.get('/', (req, res) => {
  const { postId } = req.query;
  const filtered = postId ? comments.filter(c => c.postId === postId) : comments;
  res.json(filtered);
});

router.get('/:id', (req, res) => {
  const comment = comments.find(c => c.id === req.params.id);
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  res.json(comment);
});

router.post('/', checkAuthenticated, (req, res) => {
  const { postId, text } = req.body;
  const newComment = {
    id: Date.now().toString(),
    postId,
    userId: req.user.id,
    text
  };
  comments.push(newComment);
  res.status(201).json(newComment);
});

router.patch('/:id', checkAuthenticated, (req, res) => {
  const comment = comments.find(c => c.id === req.params.id);
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  if (comment.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

  comment.text = req.body.text || comment.text;
  res.json(comment);
});

router.delete('/:id', checkAuthenticated, (req, res) => {
  const index = comments.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Comment not found' });
  if (comments[index].userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

  comments.splice(index, 1);
  res.json({ message: 'Comment deleted' });
});

module.exports = router;
