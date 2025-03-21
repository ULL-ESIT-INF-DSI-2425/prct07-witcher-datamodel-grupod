// File: Inventario.ts
// Importamos la base de datos 
// Importamos la clase Bien
// Importamos la clase Mercader
// Importamos la clase Cliente
import { db } from "../base_datos/database.js";
import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";
/**
 * Incluye un bien en el inventario.
 * @param bien - Bien a incluir
 * @returns - Hace un push del bien en la base de datos
 */
export async function incluirBien(bien) {
    await db.read();
    // Asegurarse de que el bien sea una instancia de Bien antes de guardarlo
    const nuevoBien = Bien.fromObject(bien); // Usamos el método fromObject
    db.data.bienes.push(nuevoBien);
    await db.write();
}
/**
 * Elimina un bien del inventario.
 * @param id - Identificador del bien a eliminar
 * @returns - Promesa que se resuelve a true si se ha eliminado el bien, y a false si no se ha encontrado
 */
export async function eliminarBien(id) {
    await db.read();
    const index = db.data.bienes.findIndex(bien => bien.id === id);
    if (index !== -1) {
        db.data.bienes.splice(index, 1);
        await db.write();
        return true;
    }
    return false;
}
/**
 * Modifica un bien del inventario.
 * @param id - Identificador del bien a modificar
 * @param nuevoBien - Datos del bien modificado
 * @returns - Promesa que se resuelve a true si se ha modificado el bien, y a false si no se ha encontrado
 */
export async function modificarBien(id, nuevoBien) {
    await db.read();
    const index = db.data.bienes.findIndex(bien => bien.id === id);
    if (index !== -1) {
        db.data.bienes[index] = Bien.fromObject(nuevoBien); // Usamos el método fromObject
        await db.write();
        return true;
    }
    return false;
}
/**
 * Busca un bien por su nombre.
 * @param nombre - Nombre del bien a buscar
 * @returns - Promesa que se resuelve al bien encontrado
 */
export async function buscarBienNombre(nombre) {
    await db.read();
    const bienData = db.data.bienes.find(bien => bien.nombre === nombre);
    if (!bienData) {
        throw new Error(`Bien con nombre ${nombre} no encontrado`);
    }
    return Bien.fromObject(bienData); // Usamos el método fromObject
}
/**
 * Busca un bien por su tipo.
 * @param material - Tipo del bien a buscar
 * @returns - Promesa que se resuelve a un array de bienes encontrados
 */
export async function buscarBienTipo(material) {
    await db.read();
    return db.data.bienes
        .filter(bien => bien.material === material)
        .map(bien => Bien.fromObject(bien)); // Usamos el método fromObject
}
/**
 * Busca un bien por su Descripción.
 * @param descripcion - Descripción del bien a buscar
 * @returns - Promesa que se resuelve a un array de bienes encontrados
 */
export async function buscarBienDescripcion(descripcion) {
    await db.read();
    return db.data.bienes
        .filter(bien => bien.descripcion === descripcion)
        .map(bien => Bien.fromObject(bien)); // Usamos el método fromObject
}
/**
 * Busca un bien por su ID
 * @param id - ID del bien a buscado
 * @returns - Promesa que se resuelve al bien encontrado
 * @throws - Error si no se encuentra el bien
 */
export async function buscarBienPorId(id) {
    await db.read();
    // Asegurarse de que el ID esté comparado como cadena de texto
    const bienData = db.data.bienes.find(bien => String(bien.id) === String(id));
    if (!bienData) {
        throw new Error(`Bien con ID ${id} no encontrado`);
    }
    return Bien.fromObject(bienData); // Usamos el método fromObject
}
/**
 * Lista los bienes del inventario.
 * @param orden - Orden en el que se listan los bienes
 * @returns - Promesa que se resuelve a un array de bienes
 */
export async function listarBienes(orden = "asc_alf") {
    await db.read();
    let bienes = db.data.bienes.map(bien => Bien.fromObject(bien) // Usamos el método fromObject
    );
    // Ordenar los bienes según el criterio especificado -> Esto nos va a pasar factura en los testss
    if (orden === "asc_alf") {
        bienes.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Orden alfabético ascendente
    }
    else if (orden === "desc_alf") {
        bienes.sort((a, b) => b.nombre.localeCompare(a.nombre)); // Orden alfabético descendente
    }
    else if (orden === "asc_valor") {
        bienes.sort((a, b) => a.valor - b.valor); // Orden por valor ascendente
    }
    else if (orden === "desc_valor") {
        bienes.sort((a, b) => b.valor - a.valor); // Orden por valor descendente
    }
    return bienes;
}
/**
 * Incluye un mercader en la base de datos.
 * @param mercader - Mercader a incluir
 */
export async function incluirMercader(mercader) {
    await db.read();
    const nuevoMercader = Mercader.fromObject(mercader); // Usamos el método fromObject
    db.data.mercaderes.push(nuevoMercader);
    await db.write();
}
/**
 * Elimina un mercader de la base de datos.
 * @param id - Identificador del mercader a eliminar
 * @returns - Promesa que se resuelve a true si se ha eliminado el mercader, y a false si no se ha encontrado
 */
export async function eliminarMercader(id) {
    await db.read();
    const index = db.data.mercaderes.findIndex(mercader => mercader.id === id);
    if (index !== -1) {
        db.data.mercaderes.splice(index, 1);
        await db.write();
        return true;
    }
    return false;
}
/**
 * Modifica un mercader de la base de datos.
 * @param id - Identificador del mercader a modificar
 * @param nuevoMercader - Datos del mercader modificado
 * @returns - Promesa que se resuelve a true si se ha modificado el mercader, y a false si no se ha encontrado
 */
export async function modificarMercader(id, nuevoMercader) {
    await db.read();
    const index = db.data.mercaderes.findIndex(mercader => mercader.id === id);
    if (index !== -1) {
        db.data.mercaderes[index] = Mercader.fromObject(nuevoMercader); // Usamos el método fromObject
        await db.write();
        return true;
    }
    return false;
}
/**
 * Lista los mercaderes de la base de datos.
 * @returns - Promesa que se resuelve a un array de mercaderes
 */
export async function listarMercaderes() {
    await db.read();
    return db.data.mercaderes.map(mercader => Mercader.fromObject(mercader) // Usamos el método fromObject
    );
}
/**
 * Busca un mercader por su ID.
 * @param id - ID del mercader a buscar
 * @returns - Promesa que se resuelve al mercader encontrado
 * @throws - Error si no se encuentra el mercader
 */
export async function buscarMercaderId(id) {
    await db.read();
    const mercaderData = db.data.mercaderes.find(mercader => mercader.id === id);
    if (!mercaderData) {
        throw new Error(`Mercader con ID ${id} no encontrado`);
    }
    return Mercader.fromObject(mercaderData); // Usamos el método fromObject
}
/**
 * Busca un mercader por su nombre.
 * @param nombre - Nombre del mercader a buscar
 * @returns - Promesa que se resuelve al mercader encontrado
 * @throws - Error si no se encuentra el mercader
 */
export async function buscarMercaderNombre(nombre) {
    await db.read();
    const mercaderData = db.data.mercaderes.find(mercader => mercader.nombre === nombre);
    if (!mercaderData) {
        throw new Error(`Mercader con nombre ${nombre} no encontrado`);
    }
    return Mercader.fromObject(mercaderData); // Usamos el método fromObject
}
/**
 * Busca un mercader por su tipo.
 * @param tipo - Tipo del mercader a buscar
 * @returns - Promesa que se resuelve a un array de mercaderes encontrados
 */
export async function buscarMercaderTipo(tipo) {
    await db.read();
    return db.data.mercaderes
        .filter(mercader => mercader.tipo === tipo)
        .map(mercader => Mercader.fromObject(mercader)); // Usamos el método fromObject
}
/**
 * Busca un mercader por su ubicación.
 * @param ubicacion - Ubicación del mercader a buscar
 * @returns - Promesa que se resuelve a un array de mercaderes encontrados
 */
export async function buscarMercaderUbicacion(ubicacion) {
    await db.read();
    return db.data.mercaderes
        .filter(mercader => mercader.ubicacion === ubicacion)
        .map(mercader => Mercader.fromObject(mercader)); // Usamos el método fromObject
}
/**
 * Incluye un cliente en la base de datos.
 * @param cliente - Cliente a incluir
 */
export async function incluirCliente(cliente) {
    await db.read();
    const nuevoCliente = Cliente.fromObject(cliente); // Usamos el método fromObject
    db.data.clientes.push(nuevoCliente);
    await db.write();
}
/**
 * Elimina un cliente de la base de datos.
 * @param id - Identificador del cliente a eliminar
 * @returns - Promesa que se resuelve a true si se ha eliminado el cliente, y a false si no se ha encontrado
 */
export async function eliminarCliente(id) {
    await db.read();
    const index = db.data.clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
        db.data.clientes.splice(index, 1);
        await db.write();
        return true;
    }
    return false;
}
/**
 * Modifica un cliente de la base de datos.
 * @param id - Identificador del cliente a modificar
 * @param nuevoCliente - Datos del cliente modificado
 * @returns - Promesa que se resuelve a true si se ha modificado el cliente, y a false si no se ha encontrado
 */
export async function modificarCliente(id, nuevoCliente) {
    await db.read();
    const index = db.data.clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
        db.data.clientes[index] = Cliente.fromObject(nuevoCliente); // Usamos el método fromObject
        await db.write();
        return true;
    }
    return false;
}
/**
 * Lista los clientes de la base de datos.
 * @returns - Promesa que se resuelve a un array de clientes
 */
export async function listarClientes() {
    await db.read();
    return db.data.clientes.map(cliente => Cliente.fromObject(cliente)); // Usamos el método fromObject
}
/**
 * Busca un cliente por su ID.
 * @param id - ID del cliente a buscar
 * @returns - Promesa que se resuelve al cliente encontrado
 * @throws - Error si no se encuentra el cliente
 */
export async function buscarClienteId(id) {
    await db.read();
    const clienteData = db.data.clientes.find(cliente => cliente.id === id);
    if (!clienteData) {
        throw new Error(`Cliente con ID ${id} no encontrado`);
    }
    return Cliente.fromObject(clienteData); // Usamos el método fromObject
}
/**
 * Busca un cliente por su nombre.
 * @param nombre - Nombre del cliente a buscar
 * @returns - Promesa que se resuelve al cliente encontrado
 * @throws - Error si no se encuentra el cliente
 */
export async function buscarClienteNombre(nombre) {
    await db.read();
    const clienteData = db.data.clientes.find(cliente => cliente.nombre === nombre);
    if (!clienteData) {
        throw new Error(`Cliente con nombre ${nombre} no encontrado`);
    }
    return Cliente.fromObject(clienteData); // Usamos el método fromObject
}
/**
 * Busca un cliente por su raza.
 * @param raza - Raza del cliente a buscar
 * @returns - Promesa que se resuelve a un array de clientes encontrados
 */
export async function buscarClienteRaza(raza) {
    await db.read();
    return db.data.clientes
        .filter(cliente => cliente.raza === raza)
        .map(cliente => Cliente.fromObject(cliente)); // Usamos el método fromObject
}
/**
 * Busca un cliente por su ubicación.
 * @param ubicacion - Ubicación del cliente a buscar
 * @returns - Promesa que se resuelve a un array de clientes encontrados
 */
export async function buscarClienteUbicacion(ubicacion) {
    await db.read();
    return db.data.clientes
        .filter(cliente => cliente.ubicacion === ubicacion)
        .map(cliente => Cliente.fromObject(cliente)); // Usamos el método fromObject
}
