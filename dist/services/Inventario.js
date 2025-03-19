import { db } from "../base_datos/database.js";
import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";
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
 * Elimina un bien del inventario.
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
 */
export async function modificarBien(id, nuevoBien) {
    await db.read();
    const index = db.data.bienes.findIndex(bien => bien.id === id);
    if (index !== -1) {
        db.data.bienes[index] = nuevoBien;
        await db.write();
        return true;
    }
    return false;
}
/**
 * Busca un bien por su nombre.
 */
export async function buscarBienNombre(nombre) {
    await db.read();
    const bienData = db.data.bienes.find(bien => bien.nombre === nombre);
    if (!bienData) {
        throw new Error(`Bien con nombre ${nombre} no encontrado`);
    }
    const bien = new Bien(bienData.id, bienData.nombre, bienData.descripcion, bienData.material, bienData.peso, bienData.valor);
    return bien;
}
/**
 * Busca un bien por su material.
 */
export async function buscarBienTipo(material) {
    await db.read();
    return db.data.bienes
        .filter(bien => bien.material === material)
        .map(bien => new Bien(bien.id, bien.nombre, bien.descripcion, bien.material, bien.peso, bien.valor));
}
/**
 * Busca un bien por su descripción.
 */
export async function buscarBienDescripcion(descripcion) {
    await db.read();
    return db.data.bienes
        .filter(bien => bien.descripcion === descripcion)
        .map(bien => new Bien(bien.id, bien.nombre, bien.descripcion, bien.material, bien.peso, bien.valor));
}
/**
 * Busca un bien por su ID.
 */
export async function buscarBienPorId(id) {
    await db.read();
    // Asegurarse de que el ID esté comparado como cadena de texto
    const bienData = db.data.bienes.find(bien => String(bien.id) === String(id));
    if (!bienData) {
        throw new Error(`Bien con ID ${id} no encontrado`);
    }
    const bien = new Bien(bienData.id, bienData.nombre, bienData.descripcion, bienData.material, bienData.peso, bienData.valor);
    return bien;
}
/**
 * Obtiene todos los bienes del inventario.
 */
export async function listarBienes(orden = "asc_alf") {
    await db.read();
    let bienes = db.data.bienes.map(bien => new Bien(bien.id, bien.nombre, bien.descripcion, bien.material, bien.peso, bien.valor));
    if (orden === "asc_alf") {
        bienes.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    else if (orden === "desc_alf") {
        bienes.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
    else if (orden === "asc_valor") {
        bienes.sort((a, b) => a.valor - b.valor);
    }
    else if (orden === "desc_valor") {
        bienes.sort((a, b) => b.valor - a.valor);
    }
    return bienes;
}
export async function listarMercaderes() {
    await db.read();
    return db.data.mercaderes.map(mercader => new Mercader(mercader.id, mercader.nombre, mercader.tipo, mercader.ubicacion, mercader.getDinero(), mercader.bienes));
}
export async function incluirMercader(mercader) {
    await db.read();
    const nuevoMercader = new Mercader(mercader.id, mercader.nombre, mercader.tipo, mercader.ubicacion, mercader.getDinero(), mercader.bienes);
    db.data.mercaderes.push(nuevoMercader);
    await db.write();
}
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
export async function modificarMercader(id, nuevoMercader) {
    await db.read();
    const index = db.data.mercaderes.findIndex(mercader => mercader.id === id);
    if (index !== -1) {
        db.data.mercaderes[index] = nuevoMercader;
        await db.write();
        return true;
    }
    return false;
}
export async function buscarMercaderId(id) {
    await db.read();
    const mercaderData = db.data.mercaderes.find(mercader => mercader.id === id);
    if (!mercaderData) {
        throw new Error(`Mercader con ID ${id} no encontrado`);
    }
    const mercader = new Mercader(mercaderData.id, mercaderData.nombre, mercaderData.tipo, mercaderData.ubicacion, mercaderData.dinero, mercaderData.bienes);
    return mercader;
}
export async function buscarMercaderNombre(nombre) {
    await db.read();
    const mercaderData = db.data.mercaderes.find(mercader => mercader.nombre === nombre);
    if (!mercaderData) {
        throw new Error(`Mercader con nombre ${nombre} no encontrado`);
    }
    const mercader = new Mercader(mercaderData.id, mercaderData.nombre, mercaderData.tipo, mercaderData.ubicacion, mercaderData.dinero, mercaderData.bienes);
    return mercader;
}
export async function buscarMercaderTipo(tipo) {
    await db.read();
    return db.data.mercaderes
        .filter(mercader => mercader.tipo === tipo)
        .map(mercader => new Mercader(mercader.id, mercader.nombre, mercader.tipo, mercader.ubicacion, mercader.getDinero(), mercader.bienes));
}
export async function buscarMercaderUbicacion(ubicacion) {
    await db.read();
    return db.data.mercaderes
        .filter(mercader => mercader.ubicacion === ubicacion)
        .map(mercader => new Mercader(mercader.id, mercader.nombre, mercader.tipo, mercader.ubicacion, mercader.getDinero(), mercader.bienes));
}
export async function incluirCliente(cliente) {
    await db.read();
    const nuevoCliente = new Cliente(cliente.id, cliente.nombre, cliente.raza, cliente.ubicacion, cliente.dinero, cliente.bienes);
    db.data.clientes.push(nuevoCliente);
    await db.write();
}
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
export async function modificarCliente(id, nuevoCliente) {
    await db.read();
    const index = db.data.clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
        db.data.clientes[index] = nuevoCliente;
        await db.write();
        return true;
    }
    return false;
}
export async function buscarClienteId(id) {
    await db.read();
    const clienteData = db.data.clientes.find(cliente => cliente.id === id);
    if (!clienteData) {
        throw new Error(`Cliente con ID ${id} no encontrado`);
    }
    const cliente = new Cliente(clienteData.id, clienteData.nombre, clienteData.raza, clienteData.ubicacion, clienteData.dinero, clienteData.bienes);
    return cliente;
}
export async function buscarClienteNombre(nombre) {
    await db.read();
    const clienteData = db.data.clientes.find(cliente => cliente.nombre === nombre);
    if (!clienteData) {
        throw new Error(`Cliente con nombre ${nombre} no encontrado`);
    }
    const cliente = new Cliente(clienteData.id, clienteData.nombre, clienteData.raza, clienteData.ubicacion, clienteData.dinero, clienteData.bienes);
    return cliente;
}
export async function buscarClienteRaza(raza) {
    await db.read();
    return db.data.clientes
        .filter(cliente => cliente.raza === raza)
        .map(cliente => new Cliente(cliente.id, cliente.nombre, cliente.raza, cliente.ubicacion, cliente.dinero, cliente.bienes));
}
export async function buscarClienteUbicacion(ubicacion) {
    await db.read();
    return db.data.clientes
        .filter(cliente => cliente.ubicacion === ubicacion)
        .map(cliente => new Cliente(cliente.id, cliente.nombre, cliente.raza, cliente.ubicacion, cliente.dinero, cliente.bienes));
}
export async function listarClientes() {
    await db.read();
    return db.data.clientes.map(cliente => new Cliente(cliente.id, cliente.nombre, cliente.raza, cliente.ubicacion, cliente.dinero, cliente.bienes));
}
