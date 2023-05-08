import { Router } from "express";
import {getClientInfo} from "../controllers/client.controller.js";
const router = Router()
import Client from '../models/Client.js'


router.get("/", (req, res) =>{
    res.send("Obteniendo datos desde la API!")
});

router.get("/client/:account_number", getClientInfo);

router.get("/transaction", (req, res) =>{
    res.send("Obteniendo datos de las transacciones!")
});

export default router;