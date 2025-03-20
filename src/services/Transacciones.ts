//File: Transacciones.ts

// Importamos la base de datos
// Importamos la clase Transaccion
// Importamos las clases Bien, Mercader y Cliente
import { db } from "../base_datos/database.js";
import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";

/**
 * Clase Transaccion
 */
export class Transaccion {
  id: string;
  tipo: 'venta' | 'compra' | 'devolucion';
  fecha: Date;
  bienId: string;
  IdPersona?: string;
  coronas: number;

  /**
   * Constructor de la clase Transaccion
   * @param tipo - Tipo de transacción
   * @param bienId - Identificador del bien
   * @param coronas - Cantidad de coronas
   * @param IdPersona - Identificador de la persona
   */
  constructor(
    tipo: 'venta' | 'compra' | 'devolucion',
    bienId: string,
    coronas: number,
    IdPersona: string
  ) {
    this.id = (db.data.transacciones.length + 1).toString();
    this.tipo = tipo;
    this.fecha = new Date();
    this.bienId = bienId;
    this.IdPersona = IdPersona;
    this.coronas = coronas;
  }

  static fromObject(transaccionData: any): Transaccion {
    return new Transaccion(
      transaccionData.tipo,
      transaccionData.bienId,
      transaccionData.coronas,
      transaccionData.IdPersona
    );
  }

  mostrarInfo() {
    console.log(`Cantidad: ${this.coronas} coronas`);
    console.log(`Fecha: ${this.fecha.toLocaleString()}`);
    console.log(`Id del bien : ${this.bienId}`);
  }
}

/**
 * Método asincrónico que registra una venta
 * @param bienId - Identificador del bien
 * @param clienteId - Identificador del cliente
 */
export async function registrarVenta(bienId: string, clienteId: string) {
  await db.read();

  const bien = db.data.bienes.find(b => b.id === bienId); // Buscamos el bien
  const cliente = db.data.clientes.find(c => c.id === clienteId); // Buscamos el cliente

  // Comprobamos que el bien y el cliente existan
  if (!bien || !cliente) {  
    console.log("Bien, cliente o mercader no encontrado.");
    return;
  }

  // Comprobamos que el cliente tenga suficientes coronas
  if (cliente.dinero < bien.valor) {
    console.log("El cliente no tiene suficientes coronas.");
    return;
  }

  cliente.dinero -= bien.valor; // Restamos el valor del bien al cliente
  const transaccion = new Transaccion('venta', bienId, bien.valor, clienteId); // Creamos la transacción

  cliente.bienes.push(bien);  // Añadimos el bien al cliente

  db.data.transacciones.push(transaccion);  // Añadimos la transacción
  db.data.bienes = db.data.bienes.filter(b => b.id !== bienId); // Eliminamos el bien de la lista de bienes
  await db.write(); // Guardamos los cambios

  // Mostramos un mensaje de confirmación
  console.log(`🪙​ Se ha realizado una venta: ${bien.nombre} vendido a ${cliente.nombre} por ${bien.valor} coronas.🪙​`);
}

/**
 * Método asincrónico que registra una compra
 * @param bienId - Identificador del bien
 * @param mercaderId - Identificador del mercader
 */
export async function registrarCompra(bienId: string, mercaderId: string) {
  await db.read();

  const mercader = db.data.mercaderes.find(m => m.id === mercaderId); // Buscamos el mercader

  // Comprobamos que el mercader exista
  if (!mercader) {
    console.log("Mercader no encontrado.");
    return;
  }

  const bien = mercader.bienes.find(b => b.id === bienId); // Buscamos el bien
  if (!bien) {  
    console.log("Bien no encontrado.");
    return;
  }

  mercader.dinero += bien.valor;  // Sumamos el valor del bien al mercader
  const transaccion = new Transaccion('compra', bienId, bien.valor, mercaderId); // Creamos la transacción

  mercader.bienes = mercader.bienes.filter(b => b.id !== bienId); // Eliminamos el bien de la lista de bienes

  db.data.transacciones.push(transaccion);  // Añadimos la transacción
  db.data.bienes.push(bien);  // Añadimos el bien a la lista de bienes
  await db.write(); 

  console.log(`🪙​ Se ha realizado una compra: ${bien.nombre} comprado a ${mercader.nombre} por ${bien.valor} coronas.🪙​`);
}

/**
 * Método asincrónico que procesa una devolución
 * @param bienId - Identificador del bien
 * @param IdPersona - Identificador de la persona
 * @param tipo - Tipo de transacción
 */
export async function procesarDevolucion(bienId: string, IdPersona: string, tipo: 'venta' | 'compra') {
  // Comprobamos si es una devolución de venta o de compra
  if (tipo === 'venta') {
    await db.read();

    const cliente = db.data.clientes.find(c => c.id === IdPersona); // Buscamos el cliente
    
    if (!cliente) { 
      console.log("Cliente no encontrado.");
      return;
    }

    const bien = cliente.bienes.find(b => b.id === bienId); // Buscamos el bien
    if (!bien) {
      console.log("Bien no encontrado.");
      return;
    }

    cliente.dinero += bien.valor; // Devolvemos el valor del bien al cliente
    const transaccion = new Transaccion('devolucion', bienId, bien.valor, IdPersona); // Creamos la transacción

    cliente.bienes = cliente.bienes.filter(b => b.id !== bienId); // Eliminamos el bien de la lista de bienes

    db.data.bienes.push(bien);  // Añadimos el bien a la lista de bienes
    db.data.transacciones.push(transaccion);  // Añadimos la transacción
    await db.write();

    console.log(`🪙​ Se ha realizado una devolución: ${bien.nombre} devuelto por ${cliente.nombre} insatisfech@ por ${bien.valor} coronas.🪙​`);
  }
  else if (tipo === 'compra') {
    await db.read();  

    const mercader = db.data.mercaderes.find(m => m.id === IdPersona);  // Buscamos el mercader
    if (!mercader) {
      console.log("Mercader no encontrado.");
      return;
    }

    const bien = db.data.bienes.find(b => b.id === bienId); // Buscamos el bien
    if (!bien) {
      console.log("Bien no encontrado.");
      return;
    }

    mercader.dinero -= bien.valor;  // Devolvemos el valor del bien al mercader
    const transaccion = new Transaccion('devolucion', bienId, bien.valor, IdPersona); // Creamos la transacción

    mercader.bienes.push(bien); // Añadimos el bien al mercader
    db.data.bienes = db.data.bienes.filter(b => b.id !== bienId); // Eliminamos el bien de la lista de bienes
    
    db.data.transacciones.push(transaccion);  // Añadimos la transacción
    

    await db.write();
    console.log(`🪙​ Se ha realizado una devolución: ${bien.nombre} defectuos@ devuelto ${mercader.nombre} por ${bien.valor} coronas.🪙​`);
  }
}