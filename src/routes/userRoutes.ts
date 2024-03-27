import {getAllUsers, getUser, updateUser, InactiveUser, createUser} from '../controller/userController';

const express = require('express');
const userRoutes = express.Router();

userRoutes.post('/api/user/createUser', createUser);
userRoutes.get('/api/user/getUser/:id', getUser);
userRoutes.put('/api/user/updateUser/:id', updateUser);
userRoutes.put('/api/user/deactivate/:id', InactiveUser);
userRoutes.get('/api/user/getAllUsers', getAllUsers);

export default userRoutes;
