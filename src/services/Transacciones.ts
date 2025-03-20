import { db } from "../base_datos/database.js";
import { Bien } from "../models/Bien.js";
import { Mercader } from "../models/Mercader.js";
import { Cliente } from "../models/Cliente.js";

export class Transaccion {
  id: string;
  tipo: 'venta' | 'compra' | 'devolucion';
  fecha: Date;
  bienId: string;
  IdPersona?: string;
  coronas: number;

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
}

export async function registrarVenta(bienId: string, clienteId: string) {
  await db.read();

  const bien = db.data.bienes.find(b => b.id === bienId);
  const cliente = db.data.clientes.find(c => c.id === clienteId);

  if (!bien || !cliente) {
    console.log("Bien, cliente o mercader no encontrado.");
    return;
  }

  if (cliente.dinero < bien.valor) {
    console.log("El cliente no tiene suficientes coronas.");
    return;
  }

  cliente.dinero -= bien.valor;
  const transaccion = new Transaccion('venta', bienId, bien.valor, clienteId);

  cliente.bienes.push(bien);

  db.data.transacciones.push(transaccion);
  db.data.bienes = db.data.bienes.filter(b => b.id !== bienId);
  await db.write();

  console.log(`🪙​ Se ha realizado una venta: ${bien.nombre} vendido a ${cliente.nombre} por ${bien.valor} coronas.🪙​`);
}

export async function registrarCompra(bienId: string, mercaderId: string) {
  await db.read();

  const mercader = db.data.mercaderes.find(m => m.id === mercaderId);

  if (!mercader) {
    console.log("Mercader no encontrado.");
    return;
  }

  const bien = mercader.bienes.find(b => b.id === bienId);
  if (!bien) {
    console.log("Bien no encontrado.");
    return;
  }

  mercader.dinero += bien.valor;
  const transaccion = new Transaccion('compra', bienId, bien.valor, mercaderId);

  mercader.bienes = mercader.bienes.filter(b => b.id !== bienId);

  db.data.transacciones.push(transaccion);
  db.data.bienes.push(bien);
  await db.write();

  console.log(`🪙​ Se ha realizado una compra: ${bien.nombre} comprado a ${mercader.nombre} por ${bien.valor} coronas.🪙​`);
}

export async function procesarDevolucion(bienId: string, IdPersona: string, tipo: 'venta' | 'compra') {
  if (tipo === 'venta') {
    await db.read

    const cliente = db.data.clientes.find(c => c.id === IdPersona);
    if (!cliente) {
      console.log("Cliente no encontrado.");
      return;
    }

    const bien = cliente.bienes.find(b => b.id === bienId);
    if (!bien) {
      console.log("Bien no encontrado.");
      return;
    }

    cliente.dinero += bien.valor;
    const transaccion = new Transaccion('devolucion', bienId, bien.valor, IdPersona);

    cliente.bienes = cliente.bienes.filter(b => b.id !== bienId);

    db.data.bienes.push(bien);
    db.data.transacciones.push(transaccion);
    await db.write();
    console.log(`🪙​ Se ha realizado una devolución: ${bien.nombre} devuelto por ${cliente.nombre} insatisfech@ por ${bien.valor} coronas.🪙​`);
  }
  else if (tipo === 'compra') {
    await db.read();

    const mercader = db.data.mercaderes.find(m => m.id === IdPersona);
    if (!mercader) {
      console.log("Mercader no encontrado.");
      return;
    }

    const bien = db.data.bienes.find(b => b.id === bienId);
    if (!bien) {
      console.log("Bien no encontrado.");
      return;
    }

    mercader.dinero -= bien.valor;
    const transaccion = new Transaccion('devolucion', bienId, bien.valor, IdPersona);

    mercader.bienes.push(bien);
    db.data.bienes = db.data.bienes.filter(b => b.id !== bienId);
    
    db.data.transacciones.push(transaccion);
    await db.write();
    console.log(`🪙​ Se ha realizado una devolución: ${bien.nombre} defectuos@ devuelto ${mercader.nombre} por ${bien.valor} coronas.🪙​`);
  }
}