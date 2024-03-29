import cloudinaryConfig from "../config/cloudinaryConfig";
import { Request,Response,NextFunction } from "express";



export const cloudinaryUpload = async (req: any, res: Response, next: NextFunction) => {
    try {
        console.log('cloudinary upload middleware')
        const file = req.uploadedFile;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const result = await cloudinaryConfig.uploader.upload(file.path);
        req.body.profileImage = result.secure_url;
        next();
    } catch (err:any) {
        return res.status(400).json({err : err.message, message: "Error uploading file"});
    }
}