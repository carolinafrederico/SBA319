const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/auth');
// let posts = [];
const {posts} = require('../data/db');
router.get('/', (req, res) => {
  const { userId } = req.query;
  const filtered = userId ? posts.filter(p => p.userId === userId) : posts;
  res.json(filtered);
});

router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

router.post('/', checkAuthenticated, (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    userId: req.user.id
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.patch('/:id', checkAuthenticated, (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (post.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  res.json(post);
});

router.delete('/:id', checkAuthenticated, (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  if (posts[index].userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

  posts.splice(index, 1);
  res.json({ message: 'Deleted' });
});

module.exports = router;
