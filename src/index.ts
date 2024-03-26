import dotenv from 'dotenv'
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../config.env')});
import db from './config/db'
import createApp from './utils/server'
const app = createApp()
const PORT = process.env.PORT? parseInt(process.env.PORT) : 3000
db()
console.log(process.env.URI)
app.listen(3000,()=>{
    console.log("app is running on port 3000")
})
