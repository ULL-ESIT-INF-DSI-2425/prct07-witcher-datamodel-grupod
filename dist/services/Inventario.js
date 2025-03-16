import { db } from "../base_datos/database.js";
import { Bien } from "../models/Bien.js";
/**
 * Agrega un nuevo bien al inventario.
 */
export async function incluirBien(bien) {
    await db.read();
    // Asegurar que el bien sea una instancia de Bien antes de guardarlo
    const nuevoBien = new Bien(bien.id, bien.nombre, bien.descripcion, bien.material, bien.peso, bien.valor);
    db.data.bienes.push(nuevoBien);
    await db.write();
}
/**
 * Obtiene todos los bienes del inventario.
 */
export async function listarBienes() {
    await db.read();
    return db.data.bienes.map(bien => new Bien(bien.id, bien.nombre, bien.descripcion, bien.material, bien.peso, bien.valor));
}
/**
 * Busca un bien por su ID.
 */
export async function buscarBienPorId(id) {
    await db.read();
    return db.data.bienes.find(bien => bien.id === id) || null;
}
