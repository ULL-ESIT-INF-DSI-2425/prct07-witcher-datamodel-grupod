import { db } from "../base_datos/database.js";
import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";

export class Transaccion {
  id: string;
  tipo: 'venta' | 'compra' | 'devolucion';
  fecha: Date;
  bienId: string;
  clienteId?: string;
  mercaderId?: string;
  coronas: number;

  constructor(
    tipo: 'venta' | 'compra' | 'devolucion',
    bienId: string,
    coronas: number,
    clienteId?: string,
    mercaderId?: string
  ) {
    this.id = (db.data.transacciones.length + 1).toString();
    this.tipo = tipo;
    this.fecha = new Date();
    this.bienId = bienId;
    this.clienteId = clienteId;
    this.mercaderId = mercaderId;
    this.coronas = coronas;
  }
}

export async function registrarVenta(bienId: string, clienteId: string, mercaderId: string) {
  await db.read();

  const bien = db.data.bienes.find(b => b.id === bienId);
  const cliente = db.data.clientes.find(c => c.id === clienteId);
  const mercader = db.data.mercaderes.find(m => m.id === mercaderId);

  if (!bien || !cliente || !mercader) {
    throw new Error("Bien, cliente o mercader no encontrado.");
  }

  if (cliente.dinero < bien.valor) {
    throw new Error("El cliente no tiene suficientes coronas.");
  }

  cliente.dinero -= bien.valor;
  mercader.dinero = mercader.dinero + bien.valor;

  const transaccion = new Transaccion('venta', bienId, bien.valor, clienteId, mercaderId);

  db.data.transacciones.push(transaccion);
  db.data.bienes = db.data.bienes.filter(b => b.id !== bienId);
  await db.write();

  console.log(`💰 Venta realizada: ${bien.nombre} vendido a ${cliente.nombre} por ${bien.valor} coronas.`);
}

export async function registrarCompra(bien: Bien, mercaderId: string, coronas: number) {
  /**
  await db.read();

  const mercader = db.data.mercaderes.find(m => m.id === mercaderId);
  if (!mercader) {
    throw new Error("Mercader no encontrado.");
  }

  const transaccion = new Transaccion('compra', bien.id, coronas, undefined, mercaderId);

  db.data.transacciones.push(transaccion);
  db.data.bienes.push(bien);
  await db.write();

  console.log(`📦 Compra realizada: ${bien.nombre} adquirido de ${mercader.nombre} por ${coronas} coronas.`);
  */
}

export async function procesarDevolucion(bienId: string, origen: "cliente" | "mercader", coronas: number) {
  /**
  await db.read();

  const bien = db.data.bienes.find(b => b.id === bienId);
  if (!bien) {
    throw new Error("Bien no encontrado.");
  }

  let clienteId, mercaderId;
  if (origen === "cliente") {
    const cliente = db.data.clientes.find(c => c.id === bienId);
    if (!cliente) {
      throw new Error("Cliente no encontrado.");
    }
    clienteId = cliente.id;
  } else {
    const mercader = db.data.mercaderes.find(m => m.id === bienId);
    if (!mercader) {
      throw new Error("Mercader no encontrado.");
    }
    mercaderId = mercader.id;
  }

  const transaccion = new Transaccion('devolucion', bienId, coronas, clienteId, mercaderId);

  db.data.transacciones.push(transaccion);
  await db.write();

  console.log(`🔄 Devolución procesada: ${bien.nombre} devuelto por un ${origen} por ${coronas} coronas.`);
  */
}
