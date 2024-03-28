import express from 'express';
import tagRoutes from '../routes/tagRoutes';
import blogRoutes from '../routes/blogRoutes'
const createApp = ():express.Application =>{
    const app:express.Application = express()
    app.use(express.json())
    app.use('/api/tag', tagRoutes)
    app.use('/api/blog',blogRoutes)
    return app
}
export default createApp