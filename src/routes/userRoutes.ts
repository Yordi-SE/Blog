import {getAllUsers, getUser, updateUser, InactiveUser, createUser} from '../controller/userController';


const express = require('express');
const userRoutes = express.Router();

userRoutes.post('/createUser', createUser);
userRoutes.get('/getUser/:id', getUser);
userRoutes.put('/updateUser/:id', updateUser);
userRoutes.put('/deactivate/:id', InactiveUser);
userRoutes.get('/getAllUsers', getAllUsers);

export default userRoutes