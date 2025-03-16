import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
// Configuración de la base de datos
const db = new Low(new JSONFile("src/base_datos/db.json"), {
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
