import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { createComment, deleteComment, getComments, updateComment } from "../controller/comment-controller";
const route = Router();

route.post('/createComment/:userId/:blogId', createComment);
route.get('/getComment/:blogId', getComments);
route.put('/updateComment/:blogId', updateComment);
route.delete('/deleteComment/:commentId', deleteComment);

export default route;