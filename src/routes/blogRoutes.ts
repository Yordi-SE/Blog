import { Router } from "express";
import blogControllers from "../controller/blogController";
import validateBlogData from "../middleware/joiBlogValidation";
const router = Router();

router.post('/create',validateBlogData,blogControllers.createBlog)
router.get('/',validateBlogData,blogControllers.getAll)
router.patch('/update/:id',validateBlogData,blogControllers.patchBlog)
router.delete('/delete/:id',validateBlogData,blogControllers.deleteBlog)
router.get('/getById/:id',validateBlogData,blogControllers.getById)
router.get('/myBlogs',validateBlogData,blogControllers.getMyBlog)
router.get('/userBlogs/:username',validateBlogData,blogControllers.getUserBlog)
export default router