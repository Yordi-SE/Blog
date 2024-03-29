import login from "../controller/authController";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/login", login);

export default authRoute;