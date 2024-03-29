import {getAllUsers, getUser, updateUser, InactiveUser, createUser} from '../controller/userController';
import { handleFileUpload } from '../middleware/multer';
import { cloudinaryUpload } from '../middleware/fileUpload';
import { Router } from 'express';
import { create } from 'domain';



const userRoutes = Router();


// userRoutes.post('/createUser',createUser);
userRoutes.post('/createUser', handleFileUpload, cloudinaryUpload, createUser);
userRoutes.get('/getUser/', getUser);
userRoutes.put('/updateUser/', updateUser);
userRoutes.put('/deactivate/:username', InactiveUser);
userRoutes.get('/getAllUsers', getAllUsers);

export default userRoutes