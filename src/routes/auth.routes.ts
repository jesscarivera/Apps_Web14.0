import { Router } from "express";
import { deleteUser, encryptPassword, getAllUsers, getTimeToken, getUserByUser, login, saveUser, updateToken, updateUser } from "../controllers/auth.controllers";
import { get } from "http";

const router = Router();

//Utiliza el endpoint logico
//login-user y el metodo post
router.post('/login',login);
router.get('/getTime/:userId',getTimeToken);
router.patch('/update/:userId', updateToken);
router.get('/user', getAllUsers);
router.post('/users', saveUser);
router.get('/username/:userName', getUserByUser);
router.patch('/users/:userId', updateUser);
router.post('/encrypt', encryptPassword);
router.delete('/users/:userId', deleteUser);


export default router;