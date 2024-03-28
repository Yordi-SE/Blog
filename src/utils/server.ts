import express from 'express';
import userRoutes from '../routes/userRoutes';
import bodyParser from 'body-parser';
import multer from 'multer';

import tagRoutes from '../routes/tag-routes';
import tagRoutes from '../routes/tagRoutes';
import blogRoutes from '../routes/blogRoutes'
const createApp = ():express.Application =>{
    const app:express.Application = express()
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json())

    app.use(express.urlencoded({extended:true}))
    app.use(userRoutes)

    app.use('/api', tagRoutes)
    app.use('/api',blogRoutes)
    return app
}
export default createApp