import { db } from "../base_datos/database.js";
import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";

/**
 * Agrega un nuevo bien al inventario.
 */
export async function incluirBien(bien: Bien) {
  await db.read();
  // Asegurarse de que el bien sea una instancia de Bien antes de guardarlo
  const nuevoBien = Bien.fromObject(bien);  // Usamos el método fromObject
  db.data.bienes.push(nuevoBien);
  await db.write();
}

/**
 * Elimina un bien del inventario.
 */
export async function eliminarBien(id: string) {
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
export async function modificarBien(id: string, nuevoBien: Bien) {
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
 */
export async function buscarBienNombre(nombre: string): Promise<Bien> {
  await db.read();
  const bienData = db.data.bienes.find(bien => bien.nombre === nombre);
  if (!bienData) {
    throw new Error(`Bien con nombre ${nombre} no encontrado`);
  }
  return Bien.fromObject(bienData); // Usamos el método fromObject
}

/**
 * Busca un bien por su material.
 */
export async function buscarBienTipo(material: string): Promise<Bien[]> {
  await db.read();
  return db.data.bienes
    .filter(bien => bien.material === material)
    .map(bien => Bien.fromObject(bien)); // Usamos el método fromObject
}

/**
 * Busca un bien por su descripción.
 */
export async function buscarBienDescripcion(descripcion: string): Promise<Bien[]> {
  await db.read();
  return db.data.bienes
    .filter(bien => bien.descripcion === descripcion)
    .map(bien => Bien.fromObject(bien)); // Usamos el método fromObject
}

/**
 * Busca un bien por su ID.
 */
export async function buscarBienPorId(id: string): Promise<Bien> {
  await db.read();
  // Asegurarse de que el ID esté comparado como cadena de texto
  const bienData = db.data.bienes.find(bien => String(bien.id) === String(id));
  if (!bienData) {
    throw new Error(`Bien con ID ${id} no encontrado`);
  }
  return Bien.fromObject(bienData); // Usamos el método fromObject
}

/**
 * Obtiene todos los bienes del inventario.
 */
export async function listarBienes(orden: string = "asc_alf"): Promise<Bien[]> {
  await db.read();
  let bienes = db.data.bienes.map(
    bien => Bien.fromObject(bien) // Usamos el método fromObject
  );

  if (orden === "asc_alf") {
    bienes.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (orden === "desc_alf") {
    bienes.sort((a, b) => b.nombre.localeCompare(a.nombre));
  } else if (orden === "asc_valor") {
    bienes.sort((a, b) => a.valor - b.valor);
  } else if (orden === "desc_valor") {
    bienes.sort((a, b) => b.valor - a.valor);
  }

  return bienes;
}

export async function listarMercaderes(): Promise<Mercader[]> {
  await db.read();
  return db.data.mercaderes.map(
    mercader => Mercader.fromObject(mercader) // Usamos el método fromObject
  );
}

export async function incluirMercader(mercader: Mercader) {
  await db.read();
  const nuevoMercader = Mercader.fromObject(mercader); // Usamos el método fromObject
  db.data.mercaderes.push(nuevoMercader);
  await db.write();
}

export async function eliminarMercader(id: string) {
  await db.read();
  const index = db.data.mercaderes.findIndex(mercader => mercader.id === id);
  if (index !== -1) {
    db.data.mercaderes.splice(index, 1);
    await db.write();
    return true;
  }
  return false;
}

export async function modificarMercader(id: string, nuevoMercader: Mercader) {
  await db.read();
  const index = db.data.mercaderes.findIndex(mercader => mercader.id === id);
  if (index !== -1) {
    db.data.mercaderes[index] = Mercader.fromObject(nuevoMercader); // Usamos el método fromObject
    await db.write();
    return true;
  }
  return false;
}

export async function buscarMercaderId(id: string): Promise<Mercader> {
  await db.read();
  const mercaderData = db.data.mercaderes.find(mercader => mercader.id === id);
  if (!mercaderData) {
    throw new Error(`Mercader con ID ${id} no encontrado`);
  }
  return Mercader.fromObject(mercaderData); // Usamos el método fromObject
}

export async function buscarMercaderNombre(nombre: string): Promise<Mercader> {
  await db.read();
  const mercaderData = db.data.mercaderes.find(mercader => mercader.nombre === nombre);
  if (!mercaderData) {
    throw new Error(`Mercader con nombre ${nombre} no encontrado`);
  }
  return Mercader.fromObject(mercaderData); // Usamos el método fromObject
}

export async function buscarMercaderTipo(tipo: string): Promise<Mercader[]> {
  await db.read();
  return db.data.mercaderes
    .filter(mercader => mercader.tipo === tipo)
    .map(mercader => Mercader.fromObject(mercader)); // Usamos el método fromObject
}

export async function buscarMercaderUbicacion(ubicacion: string): Promise<Mercader[]> {
  await db.read();
  return db.data.mercaderes
    .filter(mercader => mercader.ubicacion === ubicacion)
    .map(mercader => Mercader.fromObject(mercader)); // Usamos el método fromObject
}

export async function incluirCliente(cliente: Cliente) {
  await db.read();
  const nuevoCliente = Cliente.fromObject(cliente); // Usamos el método fromObject
  db.data.clientes.push(nuevoCliente);
  await db.write();
}

export async function eliminarCliente(id: string) {
  await db.read();
  const index = db.data.clientes.findIndex(cliente => cliente.id === id);
  if (index !== -1) {
    db.data.clientes.splice(index, 1);
    await db.write();
    return true;
  }
  return false;
}

export async function modificarCliente(id: string, nuevoCliente: Cliente) {
  await db.read();
  const index = db.data.clientes.findIndex(cliente => cliente.id === id);
  if (index !== -1) {
    db.data.clientes[index] = Cliente.fromObject(nuevoCliente); // Usamos el método fromObject
    await db.write();
    return true;
  }
  return false;
}

export async function buscarClienteId(id: string): Promise<Cliente> {
  await db.read();
  const clienteData = db.data.clientes.find(cliente => cliente.id === id);
  if (!clienteData) {
    throw new Error(`Cliente con ID ${id} no encontrado`);
  }
  return Cliente.fromObject(clienteData); // Usamos el método fromObject
}

export async function buscarClienteNombre(nombre: string): Promise<Cliente> {
  await db.read();
  const clienteData = db.data.clientes.find(cliente => cliente.nombre === nombre);
  if (!clienteData) {
    throw new Error(`Cliente con nombre ${nombre} no encontrado`);
  }
  return Cliente.fromObject(clienteData); // Usamos el método fromObject
}

export async function buscarClienteRaza(raza: string): Promise<Cliente[]> {
  await db.read();
  return db.data.clientes
    .filter(cliente => cliente.raza === raza)
    .map(cliente => Cliente.fromObject(cliente)); // Usamos el método fromObject
}

export async function buscarClienteUbicacion(ubicacion: string): Promise<Cliente[]> {
  await db.read();
  return db.data.clientes
    .filter(cliente => cliente.ubicacion === ubicacion)
    .map(cliente => Cliente.fromObject(cliente)); // Usamos el método fromObject
}

export async function listarClientes(): Promise<Cliente[]> {
  await db.read();
  return db.data.clientes.map(cliente => Cliente.fromObject(cliente)); // Usamos el método fromObject
}
