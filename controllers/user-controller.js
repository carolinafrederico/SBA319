import User from '../models/user-model.js';

// Index - Get all users
async function getUsers(req, res) {
  try {
    const users = await User.find({}).populate('post').populate('comment');
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Create - Create a new user
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
}

// Show - Get one user by ID
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).populate('post').populate('comment');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching user', error: err.message });
  }
}

// Update - Update a user's info
async function updateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err.message });
  }
}

// Delete - Remove a user
async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted', user: deletedUser });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting user', error: err.message });
  }
}

export {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
