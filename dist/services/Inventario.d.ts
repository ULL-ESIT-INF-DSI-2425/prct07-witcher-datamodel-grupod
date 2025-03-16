import { Bien } from "../models/Bien.js";
/**
 * Agrega un nuevo bien al inventario.
 */
export declare function incluirBien(bien: Bien): Promise<void>;
/**
 * Obtiene todos los bienes del inventario.
 */
export declare function listarBienes(): Promise<Bien[]>;
/**
 * Busca un bien por su ID.
 */
export declare function buscarBienPorId(id: string): Promise<Bien | null>;
