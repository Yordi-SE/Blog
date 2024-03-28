import { Router } from "express";
import { createTag, deleteTag, getAllTags, updateTag } from "../controller/tagController";
const route = Router();


route.get('/getAllTags', getAllTags);
route.post('/createTag', createTag);
route.put('/updateTag/:id', updateTag);
route.delete('/deleteTag/:id', deleteTag);

export default route;