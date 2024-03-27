import { Router } from "express";
import { createTag, deleteTag, getAllTags, updateTag } from "../controller/tagController";
const route = Router();


route.get('/tag/getAllTags', getAllTags);
route.post('/tag/createTag', createTag);
route.put('/tag/updateTag/:id', updateTag);
route.delete('/tag/deleteTag/:id', deleteTag);

export default route;