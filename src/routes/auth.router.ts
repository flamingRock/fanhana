import express from 'express';
import * as authController from '../controller/auth.controller';
export const authRoute = express();

// 회원가입
authRoute.post('/register', authController.addUserHandler);

// 로그인
authRoute.post('/logIn', authController.logIn);