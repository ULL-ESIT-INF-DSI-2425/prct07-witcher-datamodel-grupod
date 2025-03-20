// File: database.ts
// Importar las clases necesarias
import { Low } from "lowdb"; // Importamos Low para trabajar con la base de datos 
import { JSONFile } from "lowdb/node"; // Importamos JSONFile para trabajar con archivos JSON
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
const db = new Low(new JSONFile("src/base_datos/db.json"), {
    bienes: [],
    mercaderes: [],
    clientes: [],
    transacciones: [],
});
/**
 * Inicializa la base de datos
 * @async - Asíncrono
 * @function initDB - Inicializa la base de datos
 */
export async function initDB() {
    await db.read();
    db.data ||= { bienes: [], mercaderes: [], clientes: [], transacciones: [] }; // Asegurar estructura inicial
    await db.write();
}
// Exportar la base de datos
export { db };
