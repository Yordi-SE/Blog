import { Router } from "express";
import blogControllers from "../controller/blogController";
import validateBlogData from "../middleware/joiBlogValidation";
const router = Router();

router.post('/blog/create',validateBlogData,blogControllers.createBlog)
router.get('/blog',validateBlogData,blogControllers.getAll)
router.patch('/blog/update/:id',validateBlogData,blogControllers.patchBlog)
router.delete('/blog/delete/:id',validateBlogData,blogControllers.deleteBlog)
router.get('/blog/getById/:id',validateBlogData,blogControllers.getById)
router.get('/blog/myBlogs',validateBlogData,blogControllers.getMyBlog)
router.get('/blog/userBlogs/:username',validateBlogData,blogControllers.getUserBlog)
export default router