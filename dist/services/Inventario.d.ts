import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";
/**
 * Agrega un nuevo bien al inventario.
 */
export declare function incluirBien(bien: Bien): Promise<void>;
/**
 * Elimina un bien del inventario.
 */
export declare function eliminarBien(id: string): Promise<boolean>;
/**
 * Modifica un bien del inventario.
 */
export declare function modificarBien(id: string, nuevoBien: Bien): Promise<boolean>;
/**
 * Busca un bien por su nombre.
 */
export declare function buscarBienNombre(nombre: string): Promise<Bien>;
/**
 * Busca un bien por su material.
 */
export declare function buscarBienTipo(material: string): Promise<Bien[]>;
/**
 * Busca un bien por su descripción.
 */
export declare function buscarBienDescripcion(descripcion: string): Promise<Bien[]>;
/**
 * Busca un bien por su ID.
 */
export declare function buscarBienPorId(id: string): Promise<Bien>;
/**
 * Obtiene todos los bienes del inventario.
 */
export declare function listarBienes(orden?: string): Promise<Bien[]>;
export declare function listarMercaderes(): Promise<Mercader[]>;
export declare function incluirMercader(mercader: Mercader): Promise<void>;
export declare function eliminarMercader(id: string): Promise<boolean>;
export declare function modificarMercader(id: string, nuevoMercader: Mercader): Promise<boolean>;
export declare function buscarMercaderId(id: string): Promise<Mercader>;
export declare function buscarMercaderNombre(nombre: string): Promise<Mercader>;
export declare function buscarMercaderTipo(tipo: string): Promise<Mercader[]>;
export declare function buscarMercaderUbicacion(ubicacion: string): Promise<Mercader[]>;
export declare function incluirCliente(cliente: Cliente): Promise<void>;
export declare function eliminarCliente(id: string): Promise<boolean>;
export declare function modificarCliente(id: string, nuevoCliente: Cliente): Promise<boolean>;
export declare function buscarClienteId(id: string): Promise<Cliente>;
export declare function buscarClienteNombre(nombre: string): Promise<Cliente>;
export declare function buscarClienteRaza(raza: string): Promise<Cliente[]>;
export declare function buscarClienteUbicacion(ubicacion: string): Promise<Cliente[]>;
export declare function listarClientes(): Promise<Cliente[]>;
