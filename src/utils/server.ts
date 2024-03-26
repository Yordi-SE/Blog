import express from 'express';
const createApp = ():express.Application =>{
    const app:express.Application = express()
    app.use(express.json())
    return app
}
export default createApp