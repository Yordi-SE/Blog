import {getAllUsers, getUser, updateUser, InactiveUser, createUser} from '../controller/userController';
import { handleFileUpload } from '../middleware/multer';
import { cloudinaryUpload } from '../middleware/fileUpload';
import { Router } from 'express';


const userRoutes = Router();


// userRoutes.post('/createUser',createUser);
userRoutes.post('/createUser', handleFileUpload, cloudinaryUpload, createUser);
userRoutes.get('/getUser/:id', getUser);
userRoutes.put('/updateUser/:id', updateUser);
userRoutes.put('/deactivate/:id', InactiveUser);
userRoutes.get('/getAllUsers', getAllUsers);

export default userRoutes