import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";

//LA BASE DE DATOS TIENE UN CONJUNTO DE MERCADERES, BIENES Y CLIENTES
//ESTO FUNCIONA EMPLEANDO DB.JSON QUE SE GENERA DE MANERA AUTOMATICA. NO MODIFICAR DICHO ARCHIVO
// Definir la estructura de la base de datos
type Data = {
  bienes: Bien[];
  mercaderes: Mercader[];
  clientes: Cliente[];
};

// Configuración de la base de datos
const db = new Low<Data>(new JSONFile<Data>("src/database/db.json"), {
  bienes: [],
  mercaderes: [],
  clientes: [],
});

export async function initDB() {
  await db.read();
  db.data ||= { bienes: [], mercaderes: [], clientes: [] }; // Asegurar estructura inicial
  await db.write();
}

export { db };
