import express from 'express';
import tagRoutes from '../routes/tagRoutes';
import blogRoutes from '../routes/blogRoutes'
import userRoutes from '../routes/userRoutes';
import bodyParser from 'body-parser';
import multer from 'multer';

const createApp = ():express.Application =>{
    const app:express.Application = express()
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json())
    app.use('/api', tagRoutes)
    app.use('/api',blogRoutes)

    app.use(express.urlencoded({extended:true}))
    app.use(userRoutes)

    return app
}
export default createApp