import { db } from "../base_datos/database.js";
import { Bien } from "../models/Bien.js";

/**
 * Agrega un nuevo bien al inventario.
 */
export async function incluirBien(bien: Bien) {
  await db.read();
  db.data.bienes.push(bien);
  await db.write();
}

/**
 * Obtiene todos los bienes del inventario.
 */
export async function listarBienes() {
  await db.read();
  return db.data.bienes;
}

/**
 * Busca un bien por su ID.
 */
export async function buscarBienPorId(id: string) {
  await db.read();
  return db.data.bienes.find(bien => bien.id === id) || null;
}
