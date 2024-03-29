import { createRating,deleteRatingAndUpdateBlog,getBlogRatings,getUserRatings,getRating,updateRating } from "../controller/ratingController";

import { Router } from 'express';
const ratingRoutes = Router();

ratingRoutes.post('/createRating', createRating);
ratingRoutes.put('/updateRating', updateRating);
ratingRoutes.delete('/deleteRatingAndUpdateBlog', deleteRatingAndUpdateBlog);
ratingRoutes.get('/getBlogRatings', getBlogRatings);
ratingRoutes.get('/getUserRatings', getUserRatings);
ratingRoutes.get('/getRating', getRating);


export default ratingRoutes