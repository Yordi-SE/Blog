import tagRoutes from '../routes/tagRoutes';
import customHandler from '../middleware/customHandler';
import blogRoutes from '../routes/blogRoutes'
import userRoutes from '../routes/userRoutes';
import commentRoutes from '../routes/comment-route';
import express from 'express';

const createApp = (): express.Application => {
    const app: express.Application = express()
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use('/api/user', userRoutes)
    app.use('/api/tag', tagRoutes)
    app.use('/api/blog', blogRoutes)
    app.use('/api/comment', commentRoutes)
    app.use(customHandler)
    return app
}
export default createApp