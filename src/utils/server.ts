import express from 'express';
import tagRoutes from '../routes/tag-routes';
import commentRoute from '../routes/comment-route';

const createApp = ():express.Application =>{
    const app:express.Application = express()
    app.use(express.json());
    app.use('/api', tagRoutes);
    app.use('/api', commentRoute);

    return app
}
export default createApp