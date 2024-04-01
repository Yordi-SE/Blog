import { Router } from "express";
import blogControllers from "../blogControllers/blogController";
import { getUser } from "../middleware/getUser";
const router = Router();

router.post('/create',getUser,blogControllers.createBlog)
router.get('/',getUser,blogControllers.getAll)
router.patch('/update/:id',getUser,blogControllers.patchBlog)
router.delete('/delete/:id',getUser,blogControllers.deleteBlog)
router.get('/getById/:id',getUser,blogControllers.getById)
export default router