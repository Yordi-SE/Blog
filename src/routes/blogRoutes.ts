import { Router } from "express";
import blogControllers from "../controller/blogController";
import validateBlogData, { validateBlodId } from "../middleware/joiBlogValidation";
import { isAdmin, verifyToken } from "../middleware/verifyToken";
import { validateUpdateBlogData} from '../middleware/joiBlogValidation'
const router = Router();

router.post('/create',validateBlogData,verifyToken,blogControllers.createBlog)
router.get('/',verifyToken,blogControllers.getAll)
router.patch('/update/:id',validateBlodId,validateUpdateBlogData,verifyToken,blogControllers.patchBlog)
router.delete('/delete/:id',validateBlodId,verifyToken,blogControllers.deleteBlog)
router.get('/getById/:id',validateBlodId,verifyToken,blogControllers.getById)
router.get('/myBlogs',verifyToken,blogControllers.getMyBlog)
router.get('/userBlogs/:username',validateBlodId,verifyToken,isAdmin,blogControllers.getUserBlog)
export default router