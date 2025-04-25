import Post from '../models/post-model.js';

// INDEX – Get all posts
async function getPosts(req, res) {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching posts', error: error.message });
  }
}

// SHOW – Get one post by ID
async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new Error('Post not found');
    res.status(404).json({ message: 'Post not found' });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching post', error: error.message });
  }
}

// CREATE – Add a new post
async function createPost(req, res) {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
}

// UPDATE – Update a post
async function updatePost(req, res) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) throw new Error('Post not found');
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: 'Error updating post', error: error.message });
  }
}

// DELETE – Remove a post
async function deletePost(req, res) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) throw new Error('Post not found');
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting post', error: error.message });
  }
}

export {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
