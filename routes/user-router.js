import express from 'express';
import * as usersController from '../controllers/user-controller.js'
const router = express.Router();


////////////////////////////////////////////////////
//All User routes (INDUCES) + corresponding (CRUD)//
////////////////////////////////////////////////////

// Index

router.get('/', usersController.getUsers)

// Create
router.post('/', usersController.createUser);

// Show
router.get('/:id', usersController.getUserById);

// Update
router.put('/:id', usersController.updateUser);

// Delete
router.delete('/:id', usersController.deleteUser);


export default router;
