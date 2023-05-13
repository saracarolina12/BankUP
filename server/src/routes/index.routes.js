import { Router } from "express";
import {getClientInfo, login} from "../controllers/client.controller.js";
const router = Router()
import Client from '../models/Client.js'


router.get("/", (req, res) =>{
    res.send("Obteniendo datos desde la API!")
});

router.post("/client", getClientInfo);

router.post("/client/login", login);

router.get("/transaction", (req, res) =>{
    res.send("Obteniendo datos de las transacciones!")
});

export default router;