// File: database.ts

// Importar las clases necesarias
import { Low } from "lowdb";  // Importamos Low para trabajar con la base de datos 
import { JSONFile } from "lowdb/node";  // Importamos JSONFile para trabajar con archivos JSON
import { Bien } from "../models/Bien.js"; // Importamos la clase Bien desde el archivo Bien.ts
import { Mercader } from "../models/Mercader.js"; // Importamos la clase Mercader desde el archivo Mercader.ts
import { Cliente } from "../models/Cliente.js"; // Importamos la clase Cliente desde el archivo Cliente.ts
import { Transaccion } from "../services/Transacciones.js"; // Importamos la clase Transaccion desde el archivo Transacciones.ts

//LA BASE DE DATOS TIENE UN CONJUNTO DE MERCADERES, BIENES Y CLIENTES
//ESTO FUNCIONA EMPLEANDO DB.JSON QUE SE GENERA DE MANERA AUTOMATICA. NO MODIFICAR DICHO ARCHIVO
// Definir la estructura de la base de datos
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
const db = new Low<Data>(new JSONFile<Data>("src/base_datos/db.json"), {
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
