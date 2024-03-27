import express from 'express';
import tagRoutes from '../routes/tagRoutes';
import blogRoutes from '../routes/blogRoutes'
const createApp = ():express.Application =>{
    const app:express.Application = express()
    app.use(express.json())
    app.use('/api', tagRoutes)
    app.use('/api',blogRoutes)
    return app
}
export default createApp