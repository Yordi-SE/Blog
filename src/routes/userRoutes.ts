import {getAllUsers, getUser, updateUser, InactiveUser, createUser} from '../controller/userController';
import { verifyToken,isAdmin } from '../middleware/verifyToken';

const express = require('express');
const userRoutes = express.Router();

userRoutes.post('/api/user/createUser', createUser);
userRoutes.get('/api/user/getUser/:id',verifyToken,getUser);
userRoutes.put('/api/user/updateUser/:id', verifyToken,updateUser);
userRoutes.put('/api/user/deactivate/:id',isAdmin, InactiveUser);
userRoutes.get('/api/user/getAllUsers', isAdmin, getAllUsers);


export default userRoutes;
