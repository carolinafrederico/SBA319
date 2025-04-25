import express from 'express';
import * as usersController from '../controllers/user-controller.js'
const router = express.Router();

// All User routes (CRUD) with corresponding methods

// Index route
router.get('/', usersController.getUsers);

// Create route
router.post('/', usersController.createUser);

// Show route (get user by id)
router.get('/:id', usersController.getUserById);

// Update route
router.put('/:id', usersController.updateUser);

// Delete route
router.delete('/:id', usersController.deleteUser);

export default router;
