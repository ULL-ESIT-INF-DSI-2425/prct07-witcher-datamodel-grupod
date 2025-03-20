import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";
/**
 * Incluye un bien en el inventario.
 * @param bien - Bien a incluir
 * @returns - Hace un push del bien en la base de datos
 */
export declare function incluirBien(bien: Bien): Promise<void>;
/**
 * Elimina un bien del inventario.
 * @param id - Identificador del bien a eliminar
 * @returns - Promesa que se resuelve a true si se ha eliminado el bien, y a false si no se ha encontrado
 */
export declare function eliminarBien(id: string): Promise<boolean>;
/**
 * Modifica un bien del inventario.
 * @param id - Identificador del bien a modificar
 * @param nuevoBien - Datos del bien modificado
 * @returns - Promesa que se resuelve a true si se ha modificado el bien, y a false si no se ha encontrado
 */
export declare function modificarBien(id: string, nuevoBien: Bien): Promise<boolean>;
/**
 * Busca un bien por su nombre.
 * @param nombre - Nombre del bien a buscar
 * @returns - Promesa que se resuelve al bien encontrado
 */
export declare function buscarBienNombre(nombre: string): Promise<Bien>;
/**
 * Busca un bien por su tipo.
 * @param material - Tipo del bien a buscar
 * @returns - Promesa que se resuelve a un array de bienes encontrados
 */
export declare function buscarBienTipo(material: string): Promise<Bien[]>;
/**
 * Busca un bien por su Descripción.
 * @param descripcion - Descripción del bien a buscar
 * @returns - Promesa que se resuelve a un array de bienes encontrados
 */
export declare function buscarBienDescripcion(descripcion: string): Promise<Bien[]>;
/**
 * Busca un bien por su ID
 * @param id - ID del bien a buscado
 * @returns - Promesa que se resuelve al bien encontrado
 * @throws - Error si no se encuentra el bien
 */
export declare function buscarBienPorId(id: string): Promise<Bien>;
/**
 * Lista los bienes del inventario.
 * @param orden - Orden en el que se listan los bienes
 * @returns - Promesa que se resuelve a un array de bienes
 */
export declare function listarBienes(orden?: string): Promise<Bien[]>;
/**
 * Incluye un mercader en la base de datos.
 * @param mercader - Mercader a incluir
 */
export declare function incluirMercader(mercader: Mercader): Promise<void>;
/**
 * Elimina un mercader de la base de datos.
 * @param id - Identificador del mercader a eliminar
 * @returns - Promesa que se resuelve a true si se ha eliminado el mercader, y a false si no se ha encontrado
 */
export declare function eliminarMercader(id: string): Promise<boolean>;
/**
 * Modifica un mercader de la base de datos.
 * @param id - Identificador del mercader a modificar
 * @param nuevoMercader - Datos del mercader modificado
 * @returns - Promesa que se resuelve a true si se ha modificado el mercader, y a false si no se ha encontrado
 */
export declare function modificarMercader(id: string, nuevoMercader: Mercader): Promise<boolean>;
/**
 * Lista los mercaderes de la base de datos.
 * @returns - Promesa que se resuelve a un array de mercaderes
 */
export declare function listarMercaderes(): Promise<Mercader[]>;
/**
 * Busca un mercader por su ID.
 * @param id - ID del mercader a buscar
 * @returns - Promesa que se resuelve al mercader encontrado
 * @throws - Error si no se encuentra el mercader
 */
export declare function buscarMercaderId(id: string): Promise<Mercader>;
/**
 * Busca un mercader por su nombre.
 * @param nombre - Nombre del mercader a buscar
 * @returns - Promesa que se resuelve al mercader encontrado
 * @throws - Error si no se encuentra el mercader
 */
export declare function buscarMercaderNombre(nombre: string): Promise<Mercader>;
/**
 * Busca un mercader por su tipo.
 * @param tipo - Tipo del mercader a buscar
 * @returns - Promesa que se resuelve a un array de mercaderes encontrados
 */
export declare function buscarMercaderTipo(tipo: string): Promise<Mercader[]>;
/**
 * Busca un mercader por su ubicación.
 * @param ubicacion - Ubicación del mercader a buscar
 * @returns - Promesa que se resuelve a un array de mercaderes encontrados
 */
export declare function buscarMercaderUbicacion(ubicacion: string): Promise<Mercader[]>;
/**
 * Incluye un cliente en la base de datos.
 * @param cliente - Cliente a incluir
 */
export declare function incluirCliente(cliente: Cliente): Promise<void>;
/**
 * Elimina un cliente de la base de datos.
 * @param id - Identificador del cliente a eliminar
 * @returns - Promesa que se resuelve a true si se ha eliminado el cliente, y a false si no se ha encontrado
 */
export declare function eliminarCliente(id: string): Promise<boolean>;
/**
 * Modifica un cliente de la base de datos.
 * @param id - Identificador del cliente a modificar
 * @param nuevoCliente - Datos del cliente modificado
 * @returns - Promesa que se resuelve a true si se ha modificado el cliente, y a false si no se ha encontrado
 */
export declare function modificarCliente(id: string, nuevoCliente: Cliente): Promise<boolean>;
/**
 * Lista los clientes de la base de datos.
 * @returns - Promesa que se resuelve a un array de clientes
 */
export declare function listarClientes(): Promise<Cliente[]>;
/**
 * Busca un cliente por su ID.
 * @param id - ID del cliente a buscar
 * @returns - Promesa que se resuelve al cliente encontrado
 * @throws - Error si no se encuentra el cliente
 */
export declare function buscarClienteId(id: string): Promise<Cliente>;
/**
 * Busca un cliente por su nombre.
 * @param nombre - Nombre del cliente a buscar
 * @returns - Promesa que se resuelve al cliente encontrado
 * @throws - Error si no se encuentra el cliente
 */
export declare function buscarClienteNombre(nombre: string): Promise<Cliente>;
/**
 * Busca un cliente por su raza.
 * @param raza - Raza del cliente a buscar
 * @returns - Promesa que se resuelve a un array de clientes encontrados
 */
export declare function buscarClienteRaza(raza: string): Promise<Cliente[]>;
/**
 * Busca un cliente por su ubicación.
 * @param ubicacion - Ubicación del cliente a buscar
 * @returns - Promesa que se resuelve a un array de clientes encontrados
 */
export declare function buscarClienteUbicacion(ubicacion: string): Promise<Cliente[]>;
