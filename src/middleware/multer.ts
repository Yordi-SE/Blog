import multer from "multer";
import { Request, Response, NextFunction } from "express";

// Define multer middleware to handle file upload
const upload = multer({dest: 'uploads/'});


export const handleFileUpload = (req: any, res: Response, next: NextFunction) => {
    upload.single('profileImage')(req, res, (err: any) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to upload profile picture', err });
        }

        if (req.file) {
            req.uploadedFile = req.file; 
        }
        next(); 
    });
};
