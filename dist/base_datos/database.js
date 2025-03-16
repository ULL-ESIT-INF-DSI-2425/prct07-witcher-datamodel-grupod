import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Bien } from "../models/Bien.js";
// Usamos una ruta relativa simple ya que `db.json` está en `src/`
const db = new Low(new JSONFile("src/base_datos/db.json"), {
    bienes: [],
    mercaderes: [],
    clientes: [],
});
export async function initDB() {
    await db.read();
    db.data ||= { bienes: [], mercaderes: [], clientes: [] }; // Asegurar datos iniciales
    await db.write();
}
export async function addBien(bien) {
    await db.read();
    db.data.bienes.push(bien);
    await db.write();
}
export async function getBienes() {
    await db.read();
    return db.data.bienes.map(bien => new Bien(bien.id, bien.nombre, bien.descripcion, bien.material, bien.peso, bien.valor));
}
