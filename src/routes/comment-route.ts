import { Router } from "express";
import { createComment, deleteComment, getComments, updateComment } from "../controller/comment-controller";
const route = Router();

route.post('/comment/createComment', createComment);
route.get('/comment/getComment/postId', getComments);
route.put('/comment/updateComment/postId', updateComment);
route.delete('/comment/deleteComment', deleteComment);

export default route;