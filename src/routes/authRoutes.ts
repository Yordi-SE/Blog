import { login } from "../controller/authController";
const Routes = require('express').Router();

Routes.post('/api/auth/login', login);