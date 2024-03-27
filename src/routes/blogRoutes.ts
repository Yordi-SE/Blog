import { Router } from "express";
import blogControllers from "../controller/blogController";
const router = Router();

router.post('/blog/create',blogControllers.createBlog)
router.get('/blog',blogControllers.getAll)
router.patch('/blog/update/:id',blogControllers.patchBlog)
router.delete('/blog/delete/:id',blogControllers.deleteBlog)
router.get('/blog/getById/:id',blogControllers.getById)
router.get('/blog/myBlogs',blogControllers.getMyBlog)
router.get('/blog/userBlogs/:username',blogControllers.getUserBlog)
export default router