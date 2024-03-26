import express from 'express';
import tagRoutes from '../routes/tag-routes';

const createApp = ():express.Application =>{
    const app:express.Application = express()
    app.use(express.json())
    app.use('/api', tagRoutes)

    return app
}
export default createApp