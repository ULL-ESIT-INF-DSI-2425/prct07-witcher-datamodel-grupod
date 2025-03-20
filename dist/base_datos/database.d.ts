import { Low } from "lowdb";
import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";
import { Transaccion } from "../services/Transacciones.js";
/**
 * Type Data
 * @property bienes - Array de bienes
 * @property mercaderes - Array de mercaderes
 * @property clientes - Array de clientes
 * @property transacciones - Array de transacciones
 */
type Data = {
    bienes: Bien[];
    mercaderes: Mercader[];
    clientes: Cliente[];
    transacciones: Transaccion[];
};
/**
 * Instancia de la base de datos
 * @type {Low<Data>} - Base de datos
 * @const db - Base de datos
 * @param {JSONFile<Data>} - Archivo JSON
 * @param {Data} - Estructura de la base de datos
 * @property bienes - Array de bienes
 * @property mercaderes - Array de mercaderes
 * @property clientes - Array de clientes
 * @property transacciones - Array de transacciones
 */
declare const db: Low<Data>;
/**
 * Inicializa la base de datos
 * @async - Asíncrono
 * @function initDB - Inicializa la base de datos
 */
export declare function initDB(): Promise<void>;
export { db };
