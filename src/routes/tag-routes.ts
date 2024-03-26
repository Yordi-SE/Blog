import { Router } from "express";
import { createTag, deleteTag, getAllTags, updateTag } from "../controller/tag-controller";
const route = Router();


route.get('/tag/getAllTags', getAllTags);
route.post('/tag/createTag', createTag);
route.put('/tag/updateTag/:id', updateTag);
route.delete('/tag/deleteTag/:id', deleteTag);

export default route;