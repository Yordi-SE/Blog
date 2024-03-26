import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const db = async ():Promise<any> => {
    try {
        if (process.env.URI){
            await mongoose.connect(process.env.URI,{
                dbName: 'Blog'
            })
            console.log("connected to database")
        }
        else {
            console.log("no uri")
        }
    }
    catch(err){
        console.log("error connecting to database",err)
    }
}
export default db