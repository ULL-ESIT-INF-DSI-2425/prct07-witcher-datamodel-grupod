import { Low } from "lowdb";
import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";
import { Transaccion } from "../services/Transacciones.js";
type Data = {
    bienes: Bien[];
    mercaderes: Mercader[];
    clientes: Cliente[];
    transacciones: Transaccion[];
};
declare const db: Low<Data>;
export declare function initDB(): Promise<void>;
export { db };
